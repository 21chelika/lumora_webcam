const suppliedClassicFrames = [
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/blue_1.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/blue_2.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/blue_3.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/cream_music.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/graduation.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/greenpink_1.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/greenpink_2.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/pink_1.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/pink_2.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/pink_3.png',
  'https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/sunflower.png'
];

const classicFrames = suppliedClassicFrames.map((frame, index) => ({
  src: typeof frame === 'string' ? frame : frame.src,
  name: typeof frame === 'string' ? `Classic Frame ${index + 1}` : (frame.name || `Classic Frame ${index + 1}`)
}));

const fallbackFrameSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='800' height='700' viewBox='0 0 800 700'>
    <rect width='800' height='700' fill='#dfe5df'/>
    <rect x='24' y='24' width='752' height='652' rx='28' fill='#e7ebe3' stroke='#c9d2c3' stroke-width='2'/>
    <text x='400' y='350' text-anchor='middle' font-size='30' fill='#b46a72' font-family='Arial, sans-serif'>Classic Frame</text>
  </svg>
`)}`;

function setFallbackImage(img) {
  img.onerror = null;
  img.src = fallbackFrameSvg;
}

function renderClassicFrames() {
  const frameGrid = document.getElementById('classicFramesGrid');

  if (!frameGrid) return;

  frameGrid.innerHTML = '';

  const framesToRender = classicFrames.length ? classicFrames : Array.from({ length: 11 }, (_, index) => ({
    src: fallbackFrameSvg,
    name: `Classic Frame ${index + 1}`
  }));

  framesToRender.forEach((frame, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'classic-frame-card';
    button.setAttribute('aria-label', frame.name);

    const img = document.createElement('img');
    img.src = frame.src;
    img.alt = frame.name;
    img.loading = 'lazy';
    img.onerror = () => setFallbackImage(img);

    button.appendChild(img);

    button.addEventListener('click', () => {
      localStorage.setItem('lumoraSelectedFrame', JSON.stringify({
        artistId: 'classic',
        artistName: 'CLASSIC FRAME',
        groupName: 'category of classic frames',
        frameSrc: frame.src,
        frameName: frame.name,
        slots: null,
        frameIndex: index,
        sourcePage: 'classic'
      }));

      window.location.href = `camera.html?artist=classic&frame=${index}`;
    });

    frameGrid.appendChild(button);
  });
}

document.addEventListener('DOMContentLoaded', renderClassicFrames);
