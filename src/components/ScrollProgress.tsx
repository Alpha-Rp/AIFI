
import { useScrollProgress } from '@/lib/animation';
import { useTheme } from '@/lib/ThemeProvider';

export const ScrollProgress = () => {
  const progress = useScrollProgress();
  const { theme } = useTheme();
  
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-50">
      <div 
        className={`h-full transition-all duration-100 ease-out ${
          theme === 'light' ? 'bg-navy/70' : 'bg-electric-blue/80'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
