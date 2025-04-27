export default function InitialLoader() {
    const dots = Array.from({ length: 5 });
  
    return (
      <>
        <div className="fixed inset-0 z-[100] flex justify-center items-center bg-white">
          <style>
            {`
              @keyframes touchAnimation {
                0% {
                  transform: scale(1);
                  opacity: 1;
                }
                50% {
                  transform: scale(1.5); /* Increase size */
                  opacity: 0.4; /* Fade to lighter shade */
                }
                100% {
                  transform: scale(1); /* Shrink back to normal */
                  opacity: 1; /* Fade back to full opacity */
                }
              }
            `}
          </style>
  
          <div className="relative flex justify-center items-center space-x-3">
            {dots.map((_, i) => {
              // Alternating colors: #E68120 and #0792CE
              const color = i % 2 === 0 ? '#e5a365' : '#73bdde';
  
              // Stagger each dot's animation with a delay
              const delay = i * 0.4; // Increase delay to create sequential effect
  
              return (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: color,
                    animation: `touchAnimation 1.5s ease-in-out ${delay}s infinite`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
  