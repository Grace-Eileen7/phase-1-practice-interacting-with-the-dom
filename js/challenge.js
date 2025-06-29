document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  let count = parseInt(counter.innerText);
  let isPaused = false;
  let intervalId;

  const minusBtn = document.getElementById("minus");
  const plusBtn = document.getElementById("plus");
  const heartBtn = document.getElementById("heart");
  const pauseBtn = document.getElementById("pause");
  const likesList = document.querySelector(".likes");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("list");

  const likes = {}; // { number: likeCount }

  // Start counter
  function startTimer() {
    intervalId = setInterval(() => {
      if (!isPaused) {
        count++;
        counter.textContent = count;
      }
    }, 1000);
  }

  // Stop counter
  function stopTimer() {
    clearInterval(intervalId);
  }

  // Plus Button
  plusBtn.addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });

  // Minus Button
  minusBtn.addEventListener("click", () => {
    count--;
    counter.textContent = count;
  });

  // Heart Button (Likes)
  heartBtn.addEventListener("click", () => {
    if (!likes[count]) {
      likes[count] = 1;
      const li = document.createElement("li");
      li.dataset.number = count;
      li.textContent = `${count} has been liked 1 time`;
      likesList.appendChild(li);
    } else {
      likes[count]++;
      const existingLi = likesList.querySelector(`li[data-number='${count}']`);
      existingLi.textContent = `${count} has been liked ${likes[count]} times`;
    }
  });

  // Pause Button
  pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;

    if (isPaused) {
      stopTimer();
      pauseBtn.textContent = "resume";
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      startTimer();
      pauseBtn.textContent = "pause";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  // Comments
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const p = document.createElement("p");
    p.textContent = commentInput.value;
    commentList.appendChild(p);
    commentForm.reset();
  });

  // Start the timer on load
  startTimer();
});
