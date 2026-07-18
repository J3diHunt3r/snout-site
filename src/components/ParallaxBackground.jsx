import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PawPrint, Hexagon } from 'lucide-react';

const ParallaxBackground = () => {
    const { scrollYProgress } = useScroll();

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {/* Floating Paw 1 */}
            <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[10%] text-[var(--color-primary)] opacity-5 rotate-12">
                <PawPrint size={200} />
            </motion.div>

            {/* Floating Paw 2 */}
            <motion.div style={{ y: y2 }} className="absolute top-[50%] left-[5%] text-[var(--color-secondary)] opacity-5 -rotate-12">
                <PawPrint size={150} />
            </motion.div>

            {/* Geometric Shape 1 */}
            <motion.div style={{ y: y3 }} className="absolute top-[80%] right-[20%] text-gray-300 opacity-20">
                <Hexagon size={100} />
            </motion.div>

            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-[100px]" />
            </div>
        </div>
    );
};

export default ParallaxBackground;
