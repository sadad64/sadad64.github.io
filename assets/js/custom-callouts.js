document.addEventListener('DOMContentLoaded', () => {
    console.log('Custom callouts script loaded');
    const blockquotes = document.querySelectorAll('blockquote');
    console.log(`Found ${blockquotes.length} blockquotes`);
    
    blockquotes.forEach((blockquote, index) => {
      const content = blockquote.innerHTML.trim();
      console.log(`Processing blockquote ${index + 1}:`, content);
      
      // 정규 표현식을 수정하여 띄어쓰기가 있는 제목을 허용합니다
      const match = content.match(/<p>\s*\[!([^\]]+?)(?:\s*\{(.+?)\})?(?:\s*\#([a-fA-F0-9]{6}))?\]([\s\S]*?)<\/p>/i);
      if (match) {
        const type = match[1].trim(); // 앞뒤 공백 제거
        console.log(`Matched callout type: ${type}`);
        const customIcon = match[2];
        const customColor = match[3];
        const calloutContent = match[4].trim();
        
        // 클래스 이름으로 사용할 때는 공백을 대시로 변경
        const typeClass = type.toLowerCase().replace(/\s+/g, '-');
        blockquote.classList.add('callout', typeClass);
        
        if (customIcon) {
          console.log(`Custom icon detected: ${customIcon}`);
          blockquote.classList.add('custom-icon');
          blockquote.style.setProperty('--custom-icon', `url('/assets/img/callouts/${customIcon}')`);
        }
        
        if (customColor) {
          console.log(`Custom color detected: #${customColor}`);
          blockquote.style.setProperty('--callout-color', `#${customColor}`);
          blockquote.classList.add('custom-color');
        }
        
        blockquote.innerHTML = `
          <div class="callout-title">${type}</div>
          <div class="callout-content">${calloutContent}</div>
        `;
        console.log('Callout processed successfully');
      } else {
        console.log('Not a callout, skipping');
      }
    });
  });