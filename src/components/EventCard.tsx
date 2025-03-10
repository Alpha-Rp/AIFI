import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { Code2, Trophy, Mic2 } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  type: 'hackathon' | 'treasure-hunt' | 'tech-talk';
}

export const EventCard = ({ title, description, date, type }: EventCardProps) => {
  const icons = {
    'hackathon': <Code2 className="w-12 h-12 text-primary" />,
    'treasure-hunt': <Trophy className="w-12 h-12 text-primary" />,
    'tech-talk': <Mic2 className="w-12 h-12 text-primary" />
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group w-[300px] h-[280px] bg-muted/50 hover:bg-muted/70 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all">
        <CardHeader className="space-y-4">
          <div className="bg-secondary/30 w-fit p-3 rounded-xl group-hover:bg-secondary/50 transition-colors">
            {icons[type]}
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-muted-foreground/90">{description}</CardDescription>
          <p className="text-sm font-medium text-primary">{date}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
