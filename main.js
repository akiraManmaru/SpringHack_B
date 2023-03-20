/**
 * クリックすると音符が放物線を描きながら飛び出す実装
 */


const btn = document.getElementById('btn');

    // ボタンがクリックされたら、音符をアニメーションする
    btn.addEventListener('click', function() {
      // 音符を作成する
      const note = document.createElement('div');
      note.classList.add('note');
      // ボタンの位置を取得する
      const btnRect = btn.getBoundingClientRect();
      // 音符の初期位置をボタンの位置に設定する
      note.style.left = btnRect.left + 'px';
      note.style.top = btnRect.top + 'px';
      // 音符をbody要素に追加する
      document.body.appendChild(note);

      // アニメーションを開始する
      const duration = 1500; // アニメーションの時間（ミリ秒）
      const startX = btnRect.left; // 開始点のx座標
      const startY = btnRect.top - 60; // 開始点のy座標
      const endX = btnRect.left + 300; // 終了点のx座標
      const endY = window.innerHeight; // 終了点のy座標
      const gravity = 1500; // 重力の大きさ（ピクセル/秒^2）
      const startTime = Date.now(); // アニメーションの開始時間

      function animate() {
        const currentTime = Date.now() - startTime; // 現在のアニメーションの時間
        // if (currentTime >= duration) {
        //   note.remove();
        //   return;
        // }
        // 現在の位置を計算する
        const timeFraction = currentTime / duration;
        const x = startX + (endX - startX) * timeFraction;
        const y = startY - (endY - startY) * currentTime / duration + 0.5 * 1000 * Math.pow(currentTime / duration, 2);
        // 音符の位置を設定する
        note.style.left = x + 'px';
        note.style.top = y + 'px';
        // 次のフレームをアニメーションする
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });