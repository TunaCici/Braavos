import React, { useMemo, useState } from "react";

/* Static assets */
import intelligence from "../../static/intelligence.json";

/* CSS */
import "./Whoami.css";

const FINAL_IMAGE_SCORE_PERCENTAGE = 80;

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace("./", "")] = r(item); });
  return images;
}

const stageImages = importAll(require.context("../../static/whoami", false, /\.webp$/));

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

  const score = getNormalizedScore(rawScore, maxRawScore);
  const activeQuestion = questions[questionIndex];
  const isComplete = questionIndex >= questions.length;
  const image = getStageImage(imageStage);

  const answerQuestion = (answer) => {
    const nextRawScore = rawScore + answer.score;
    const targetStage = getTargetStage(getNormalizedScore(nextRawScore, maxRawScore));

    setRawScore(nextRawScore);
    setImageStage((currentStage) => moveOneStageToward(currentStage, targetStage));
    setQuestionIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <main className="whoami" data-score={score}>
      <section className="whoami-content">
        <img className="whoami-image" src={image} alt="" />

        {isComplete ? (
          <div className="whoami-question">
            <p>The last answer is still becoming.</p>
          </div>
        ) : (
          <>
            <div className="whoami-question">
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
