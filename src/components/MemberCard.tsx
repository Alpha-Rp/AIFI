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
      <Card className="w-full max-w-[300px] bg-dark-navy hover:bg-navy border border-electric-blue/30 hover:border-electric-blue/70 transition-all overflow-hidden shadow-lg">
        <div className="w-full h-[250px] sm:h-[300px] relative">
          <img
            src={image || "/placeholder-image.jpg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
          <CardDescription className="text-light-slate mt-1"></CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
