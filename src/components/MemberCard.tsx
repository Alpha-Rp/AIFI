import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { motion } from "framer-motion";

interface MemberCardProps {
  name: string;
  // role: string;
  image?: string;
}

export const MemberCard = ({ name, image }: MemberCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className=" w-[300px] bg-muted/50 hover:bg-muted/70 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all overflow-hidden">
        <div className="w-full h-[300px] relative">
          <img 
            src={image || '/placeholder-image.jpg'} 
            alt={name}
            className="w-full h-[300px] object-cover"
          />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-foreground">{name}</CardTitle>
          <CardDescription className="text-muted-foreground/90 mt-1"></CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
