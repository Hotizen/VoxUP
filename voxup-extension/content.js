// content.js
const widgetDiv = document.createElement('div');
widgetDiv.id = 'plugin-widget';
widgetDiv.style.position = 'fixed';
widgetDiv.style.bottom = '20px';
widgetDiv.style.right = '20px';
widgetDiv.style.width = '300px';
widgetDiv.style.height = '400px';
widgetDiv.style.border = '1px solid #ddd';
widgetDiv.style.backgroundColor = '#fff';
widgetDiv.style.zIndex = '9999';
widgetDiv.style.overflow = 'auto';

// Embed iframe with your lessons or feature
const iframe = document.createElement('iframe');
iframe.src = 'https://your-website.com/embed'; // URL of the embedded feature
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';

widgetDiv.appendChild(iframe);
document.body.appendChild(widgetDiv);
