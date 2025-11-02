// app.js
document.addEventListener('DOMContentLoaded', function() {
    const confirmBtn = document.getElementById('confirm-btn');
    const startBackdrop = document.getElementById('start-backdrop');
    const popupLayer = document.getElementById('popup-layer');
    const bgMusic = document.getElementById('bgMusic');
    
    // 设备检测和性能优化
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
    
    // 根据设备类型设置弹窗数量
    let maxPopups;
    if (isMobile) {
        maxPopups = 75; // 手机端减少到75个
    } else if (isTablet) {
        maxPopups = 150; // 平板端150个
    } else {
        maxPopups = 300; // PC端300个
    }
    
    // 温馨提示文本列表
    const tips = [
        '多喝水哦', '保持微笑呀', '每天都要元气满满',
        '记得吃水果', '保持好心情', '好好爱自己',
        '我想你了', '梦想成真', '期待下一次见面',
        '顺顺利利', '早点休息', '愿所有烦恼都消失',
        '别熬夜', '今天过得开心嘛', '天冷了，多穿衣服',
        '要开心呀', '记得按时吃饭', '照顾好自己',
        '一切都会好的', '你是最棒的', '保持乐观',
        '注意休息', '记得微笑', '今天也要加油',
        '保持善良', '世界因你而美好', '坚持就是胜利',
        '相信自己', '未来可期', '勇敢向前',
        '万事胜意', '平安喜乐', '健康快乐',
        '好运连连', '心想事成', '前程似锦',
        '天天开心', '笑口常开', '幸福安康'
    ];
    
    // 主题颜色列表
    const themes = [
        'blue', 'green', 'orange', 'purple', 'pink', 'yellow', 'cyan',
        'lime', 'red', 'teal', 'indigo', 'amber', 'rose', 'mint',
        'peach', 'lavender', 'coral', 'sky', 'lemon'
    ];
    
    // 统一的动画列表
    const animations = ['fade-in', 'scale-in', 'slide-up', 'slide-down'];
    
    let popupCount = 0;
    let popupInterval;
    let allPopups = []; // 存储所有弹窗元素
    
    // 创建单个弹窗
    function createPopup() {
        if (popupCount >= maxPopups) {
            clearInterval(popupInterval);
            createFinalPopup();
            return;
        }
        
        const popup = document.createElement('div');
        popup.className = 'popup';
        
        // 随机选择主题
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        popup.classList.add(`theme-${randomTheme}`);
        
        // 随机选择动画
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        popup.classList.add(`anim-${randomAnim}`);
        
        // 随机位置
        const randomX = Math.random() * (window.innerWidth - 250);
        const randomY = Math.random() * (window.innerHeight - 120);
        
        popup.style.left = `${randomX}px`;
        popup.style.top = `${randomY}px`;
        
        // 随机选择提示文本
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        popup.innerHTML = `
            <div class="header">
                <span class="icon">💝</span>
                <span class="title">温馨提示</span>
            </div>
            <div class="content">${randomTip}</div>
        `;
        
        popupLayer.appendChild(popup);
        allPopups.push(popup); // 存储弹窗引用
        popupCount++;
    }
    
    // 创建最终的中央大弹窗
    function createFinalPopup() {
        setTimeout(() => {
            try {
                // 创建遮罩层
                const finalBackdrop = document.createElement('div');
                finalBackdrop.className = 'modal-backdrop';
                finalBackdrop.id = 'final-backdrop';
                
                // 创建最终弹窗
                const finalModal = document.createElement('div');
                finalModal.className = 'modal';
                finalModal.id = 'final-modal';
                
                finalModal.innerHTML = `
                    <div class="titlebar">
                        <span class="icon">❤️</span>
                        <span class="title">特别消息</span>
                    </div>
                    <div class="content" id="final-content">
                        <div class="message-text">我想你了</div>
                        <div class="heart-icon">💖</div>
                    </div>
                    <div class="actions" id="final-actions">
                        <button class="btn primary" id="close-final-btn">我也想你 💕</button>
                    </div>
                `;
                
                finalBackdrop.appendChild(finalModal);
                document.body.appendChild(finalBackdrop);
                
                // 关闭按钮事件 - 点击后快速清除弹窗并创建爱心效果
                document.getElementById('close-final-btn').addEventListener('click', function() {
                    // 关闭最终弹窗
                    finalBackdrop.style.animation = 'modal-appear 0.3s reverse forwards';
                    setTimeout(() => {
                        if (document.body.contains(finalBackdrop)) {
                            document.body.removeChild(finalBackdrop);
                        }
                        // 快速清除所有弹窗
                        clearAllPopupsQuickly();
                    }, 300);
                });
            } catch (error) {
                console.error('创建最终弹窗时出错:', error);
                // 如果出错，尝试备用方案
                setTimeout(createFinalPopup, 100);
            }
        }, 500);
    }
    
    // 快速清除所有弹窗
    function clearAllPopupsQuickly() {
        const totalTime = isMobile ? 800 : 1500;
        const batchSize = Math.ceil(allPopups.length / (totalTime / 50));
        
        let currentIndex = 0;
        
        function clearBatch() {
            const endIndex = Math.min(currentIndex + batchSize, allPopups.length);
            
            for (let i = currentIndex; i < endIndex; i++) {
                const popup = allPopups[i];
                if (popup && popup.parentNode) {
                    // 添加消失动画
                    popup.style.animation = 'popup-disappear 0.3s forwards';
                    setTimeout(() => {
                        if (popup.parentNode) {
                            popup.parentNode.removeChild(popup);
                        }
                    }, 300);
                }
            }
            
            currentIndex = endIndex;
            
            if (currentIndex < allPopups.length) {
                // 继续处理下一批
                setTimeout(clearBatch, 50);
            } else {
                // 所有弹窗清除完成后创建爱心效果
                setTimeout(() => {
                    allPopups = []; // 清空数组
                    createHeartEffect();
                }, 400);
            }
        }
        
        // 开始清除
        clearBatch();
    }
    
    // 创建爱心弹窗效果 - 
    function createHeartEffect() {
        const heartPoints = [];
        
        // 更简单的爱心形状参数方程，更适合移动设备
        function heart_x(t, size = 10) {
            return size * 16 * Math.pow(Math.sin(t), 3);
        }
        
        function heart_y(t, size = 10) {
            return -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        }
        
        // 根据设备和屏幕尺寸计算爱心大小和密度
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const minDimension = Math.min(screenWidth, screenHeight);
        
        // 调整爱心大小，确保在手机上能完整显示
        let heartSize, step, heartPopupDelay;
        
        if (isMobile) {
            heartSize = Math.max(2, minDimension / 100); // 进一步缩小爱心
            step = 15; // 减少爱心弹窗密度
            heartPopupDelay = 250; // 减慢速度
        } else if (isTablet) {
            heartSize = Math.max(4, minDimension / 60);
            step = 8;
            heartPopupDelay = 180;
        } else {
            heartSize = Math.max(6, minDimension / 50);
            step = 5;
            heartPopupDelay = 120;
        }
        
        // 生成爱心轮廓点
        for (let i = 0; i < 628; i += step) {
            const t = i / 100;
            const x = heart_x(t, heartSize);
            const y = heart_y(t, heartSize);
            heartPoints.push({ x, y });
        }
        
        console.log(`设备: ${isMobile ? '手机' : isTablet ? '平板' : 'PC'}, 爱心大小: ${heartSize}, 弹窗数量: ${heartPoints.length}`);
        
        // 创建爱心弹窗
        heartPoints.forEach((point, index) => {
            setTimeout(() => {
                try {
                    // 将坐标转换为屏幕坐标（爱心居中显示）
                    const screenX = (screenWidth / 2) + point.x;
                    const screenY = (screenHeight / 2) + point.y;
                    
                    // 更严格的边界检查，确保弹窗在屏幕内
                    const popupWidth = 230;
                    const popupHeight = 120;
                    
                    if (screenX < 10 || screenX > screenWidth - popupWidth - 10 || 
                        screenY < 10 || screenY > screenHeight - popupHeight - 10) {
                        return;
                    }
                    
                    // 创建爱心弹窗
                    const heartPopup = document.createElement('div');
                    heartPopup.className = 'popup';
                    
                    // 随机选择主题
                    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
                    heartPopup.classList.add(`theme-${randomTheme}`);
                    
                    // 随机选择动画
                    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
                    heartPopup.classList.add(`anim-${randomAnim}`);
                    
                    // 设置位置
                    heartPopup.style.left = `${screenX}px`;
                    heartPopup.style.top = `${screenY}px`;
                    
                    // 随机选择提示文本
                    const randomTip = tips[Math.floor(Math.random() * tips.length)];
                    
                    heartPopup.innerHTML = `
                        <div class="header">
                            <span class="icon">💝</span>
                            <span class="title">我爱你</span>
                        </div>
                        <div class="content">${randomTip}</div>
                    `;
                    
                    popupLayer.appendChild(heartPopup);
                } catch (error) {
                    console.error('创建爱心弹窗时出错:', error);
                }
            }, index * heartPopupDelay);
        });
    }
    
    // 开始按钮点击事件
    confirmBtn.addEventListener('click', function() {
        // 播放背景音乐
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => {
                console.log('自动播放被阻止，需要用户交互');
            });
        }
        
        // 隐藏初始弹窗
        startBackdrop.style.display = 'none';
        
        // 根据设备调整弹窗创建速度
        const createInterval = isMobile ? 100 : 
                           isTablet ? 70 : 
                           50;
        const initialBatch = isMobile ? 8 : 
                          isTablet ? 12 : 
                          15;
        const initialDelay = isMobile ? 200 : 
                          isTablet ? 150 : 
                          100;
        
        // 开始创建弹窗
        popupInterval = setInterval(createPopup, createInterval);
        
        // 同时立即创建一些弹窗
        for (let i = 0; i < initialBatch; i++) {
            setTimeout(() => createPopup(), i * initialDelay);
        }
    });
    
    // 点击页面任意位置也可以开始（除了按钮本身）
    document.addEventListener('click', function(e) {
        if (e.target === confirmBtn) return;
        if (startBackdrop.style.display !== 'none') {
            confirmBtn.click();
        }
    });
    
    // 添加键盘支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            if (startBackdrop.style.display !== 'none') {
                confirmBtn.click();
            }
        }
    });
});