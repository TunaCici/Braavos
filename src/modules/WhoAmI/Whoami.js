import React, { useEffect, useMemo, useRef, useState } from "react";

/* Static assets */
import intelligence from "../../static/intelligence.json";

/* CSS */
import "./Whoami.css";

const FINAL_IMAGE_SCORE_PERCENTAGE = 80;
const IMAGE_TRANSITION_DURATION_MS = 1235;
const ANSWER_SHAKE_OVERALL_INTENSITY = 4.0;
const ANSWER_SHAKE_INTENSITIES = [0.33, 0.66, 1.0];
const MIN_QUESTION_SHAKE_MULTIPLIER = 0.18;
const MAX_ANSWER_SHAKE_DISTANCE = 1.65;
const MIN_ANSWER_SHAKE_DURATION_MS = 650;

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace("./", "")] = r(item); });
  return images;
}

const stageImages = importAll(require.context("../../static/whoami", false, /\.webp$/));
const preloadedStageImages = Object.values(stageImages);

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      if (img.decode) {
        img.decode().then(resolve).catch(resolve);
        return;
      }

      resolve();
    };
    img.onerror = resolve;
    img.src = src;
  });
}

function getStageImage(stage) {
  const imageName = Object.keys(stageImages).find((name) => name.includes(`_${stage}_`));

  return stageImages[imageName];
}

function getTargetStage(score) {
  if (score <= 0) {
    return 1;
  }

  if (score > FINAL_IMAGE_SCORE_PERCENTAGE) {
    return 8;
  }

  return Math.min(7, Math.floor((score - 1) / (FINAL_IMAGE_SCORE_PERCENTAGE / 6)) + 2);
}

function moveOneStageToward(currentStage, targetStage) {
  if (targetStage > currentStage) {
    return currentStage + 1;
  }

  if (targetStage < currentStage) {
    return currentStage - 1;
  }

  return currentStage;
}

function getMaxRawScore(questions) {
  return questions.reduce((total, question) => {
    const scores = question.answers.map((answer) => answer.score);
    return total + Math.max(...scores);
  }, 0);
}

function getNormalizedScore(rawScore, maxRawScore) {
  if (maxRawScore === 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((rawScore / maxRawScore) * 100)));
}

function getAnswerShakeStyle(questionIndex, questionCount, answerIndex) {
  const questionProgress = questionCount <= 1 ? 1 : questionIndex / (questionCount - 1);
  const questionMultiplier = MIN_QUESTION_SHAKE_MULTIPLIER
    + ((1 - MIN_QUESTION_SHAKE_MULTIPLIER) * questionProgress);
  const answerIntensity = ANSWER_SHAKE_INTENSITIES[answerIndex] || ANSWER_SHAKE_INTENSITIES[0];
  const shake = questionMultiplier * answerIntensity * ANSWER_SHAKE_OVERALL_INTENSITY;

  return {
    "--whoami-answer-shake-x": `${(shake * MAX_ANSWER_SHAKE_DISTANCE).toFixed(2)}px`,
    "--whoami-answer-shake-y": `${(shake * 0.72).toFixed(2)}px`,
    "--whoami-answer-shake-rotate": `${(shake * 0.16).toFixed(3)}deg`,
    "--whoami-answer-shake-duration": `${Math.max(
      MIN_ANSWER_SHAKE_DURATION_MS,
      Math.round(2050 - (shake * 720)),
    )}ms`,
    "--whoami-answer-shake-delay": `${(questionIndex * -131) - (answerIndex * 83)}ms`,
  };
}

function Whoami() {
  const questions = intelligence;
  const maxRawScore = useMemo(() => getMaxRawScore(questions), [questions]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [rawScore, setRawScore] = useState(0);
  const [imageStage, setImageStage] = useState(1);
  const initialImage = useMemo(() => getStageImage(1), []);
  const [visibleImage, setVisibleImage] = useState(initialImage);
  const [previousImage, setPreviousImage] = useState(null);
  const [transitionId, setTransitionId] = useState(0);
  const visibleImageRef = useRef(initialImage);

  const score = getNormalizedScore(rawScore, maxRawScore);
  const activeQuestion = questions[questionIndex];
  const isComplete = questionIndex >= questions.length;
  const image = getStageImage(imageStage);

  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const previousThemeColor = themeColorMeta?.getAttribute("content");

    document.documentElement.classList.add("whoami-page");
    document.body.classList.add("whoami-page");
    themeColorMeta?.setAttribute("content", "#000000");

    return () => {
      document.documentElement.classList.remove("whoami-page");
      document.body.classList.remove("whoami-page");

      if (themeColorMeta && previousThemeColor) {
        themeColorMeta.setAttribute("content", previousThemeColor);
      }
    };
  }, []);

  useEffect(() => {
    Promise.all(preloadedStageImages.map(preloadImage));
  }, []);

  useEffect(() => {
    if (image === visibleImageRef.current) {
      return undefined;
    }

    setPreviousImage(visibleImageRef.current);
    setVisibleImage(image);
    visibleImageRef.current = image;
    setTransitionId((currentId) => currentId + 1);

    const cleanup = window.setTimeout(() => {
      setPreviousImage(null);
    }, IMAGE_TRANSITION_DURATION_MS);

    return () => window.clearTimeout(cleanup);
  }, [image]);

  const answerQuestion = (answer) => {
    const nextRawScore = rawScore + answer.score;
    const targetStage = getTargetStage(getNormalizedScore(nextRawScore, maxRawScore));
    const isFinalQuestion = questionIndex === questions.length - 1;

    setRawScore(nextRawScore);
    if (!isFinalQuestion) {
      setImageStage((currentStage) => moveOneStageToward(currentStage, targetStage));
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
  };

  const tryAgain = () => {
    setQuestionIndex(0);
    setRawScore(0);
    setImageStage(1);
    setVisibleImage(initialImage);
    setPreviousImage(null);
    setTransitionId(0);
    visibleImageRef.current = initialImage;
  };

  return (
    <main className="whoami" data-score={score}>
      <section className="whoami-content">
        <div className="whoami-image-stage" aria-hidden="true">
          {previousImage && (
            <img
              className="whoami-image whoami-image-previous"
              key={`previous-${transitionId}`}
              src={previousImage}
              alt=""
            />
          )}
          <img
            className={`whoami-image${transitionId > 0 ? " whoami-image-current" : ""}`}
            key={`current-${transitionId}`}
            src={visibleImage}
            alt=""
          />
        </div>

        {isComplete ? (
          <>
            <div className="whoami-question">
              <p>"however ruined this world has become</p>
              <p>however mired in torment and despair</p>
              <p>life endures</p>
              <p>there is beauty in that, is there not?"</p>
            </div>

            <div className="whoami-answers whoami-final-actions">
              <button className="whoami-answer" type="button" onClick={tryAgain}>
                Try again
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="whoami-question">
              <span
                className="whoami-question-count"
                aria-label={`Question ${questionIndex + 1} of ${questions.length}`}
              >
                {questionIndex + 1}/{questions.length}
              </span>
              <p>{activeQuestion.question}</p>
            </div>

            <div className="whoami-answers">
              {activeQuestion.answers.map((answer, index) => (
                <button
                  className="whoami-answer whoami-answer-shaking"
                  key={`${questionIndex}-${index}`}
                  type="button"
                  style={getAnswerShakeStyle(questionIndex, questions.length, index)}
                  onClick={() => answerQuestion(answer)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Whoami;
