
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full bg-secondary/50 text-foreground hover:bg-secondary/70"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </motion.div>
  );
};
