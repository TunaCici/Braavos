import React, { useEffect, useMemo, useRef, useState } from "react";

/* Static assets */
import intelligence from "../../static/intelligence.json";

/* CSS */
import "./Whoami.css";

const FINAL_IMAGE_SCORE_PERCENTAGE = 80;
const IMAGE_TRANSITION_DURATION_MS = 1235;

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
              <p>The last answer is still becoming.</p>
            </div>

            <div className="whoami-answers whoami-answers-placeholder" aria-hidden="true">
              {questions[questions.length - 1].answers.map((answer, index) => (
                <button
                  className="whoami-answer"
                  disabled
                  key={`complete-placeholder-${index}`}
                  tabIndex={-1}
                  type="button"
                >
                  {answer.text}
                </button>
              ))}
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
                  className="whoami-answer"
                  key={`${questionIndex}-${index}`}
                  type="button"
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
