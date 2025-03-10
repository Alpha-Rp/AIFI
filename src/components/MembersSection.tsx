import { MemberCard } from "./MemberCard";
import { motion } from "framer-motion";

export const MembersSection = () => {
  const coordinators = [
    {
      name: "Dr. Harsha B K",
      // role: "Technical Head",
      image:
        "https://revaeduin.s3.ap-south-1.amazonaws.com/uploads/faculty_images/66d14db06392c1724992944.webp",
    },
    {
      name: "Dr. Rashmi C",
      // role: "Project Lead",
      image:
        "https://revaeduin.s3.ap-south-1.amazonaws.com/uploads/faculty_images/6437b14aa6e1a1681371466.webp",
    },
    {
      name: "Dr. Manjunatha S",
      // role: "Research Head",
      image:
        "https://revaeduin.s3.ap-south-1.amazonaws.com/uploads/faculty_images/66d06d4ef3b861724935502.webp",
    },
  ];

  return (
    <section className="py-24 pt-32 bg-navy/90 backdrop-blur-md relative">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">
        Our Coordinators
        <div className="mt-2 mx-auto w-24 h-1 bg-electric-blue rounded-full" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {coordinators.map((coordinator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <MemberCard {...coordinator} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
