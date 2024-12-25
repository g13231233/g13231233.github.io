document.addEventListener('DOMContentLoaded', function() {
    const shootButton = document.getElementById('shootButton');
    const shotsFiredElement = document.getElementById('shotsFired');
    let shotsFired = 0;
    const chambers = 6; // 总共6个枪膛
    let bulletPosition = Math.floor(Math.random() * chambers); // 随机设置子弹位置

    shootButton.addEventListener('click', function() {
        if (shotsFired >= chambers) {
            alert('已经射击了所有枪膛，游戏重置！');
            shotsFired = 0;
            bulletPosition = Math.floor(Math.random() * chambers);
            shotsFiredElement.textContent = '已射击：0';
            return;
        }

        shotsFired++;
        shotsFiredElement.textContent = '已射击：' + shotsFired;

        if (shotsFired - 1 === bulletPosition) {
            alert('Bang! 你中枪了！');
            shotsFired = 0;
            bulletPosition = Math.floor(Math.random() * chambers);
            shotsFiredElement.textContent = '已射击：0';
        } else {
            alert('咔嗒... 空枪，你还活着。');
        }
    });
});
