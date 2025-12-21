import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreeDButton from '../ui/3DButton/3dbutton';
import './MiniFeature.css';

export type MiniFeatureLayout = 'vertical' | 'left' | 'right';

export interface MiniFeatureData {
  id: string;
  title: string;
  description: string;
  visual: string;
  visualAlt?: string;
  features?: string[];
  cta?: {
    text: string;
    link?: string;
    onClick?: () => void;
  };
  moreInfoLink?: string;
}

interface MiniFeatureProps {
  data: MiniFeatureData;
  layout?: MiniFeatureLayout;
  index?: number;
}

const MiniFeature = ({ data, layout = 'vertical', index = 0 }: MiniFeatureProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15 + 0.2
      }
    }
  };

  return (
    <motion.div
      className={`mini-feature mini-feature--${layout}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {data.visual && (
        <motion.div 
          className="mini-feature__visual"
          variants={imageVariants}
        >
          <div className="mini-feature__visual-wrapper">
            <img 
              src={data.visual} 
              alt={data.visualAlt || data.title}
              className="mini-feature__image"
              width="800"
              height="600"
            />
            <div className="mini-feature__visual-glow"></div>
          </div>
        </motion.div>
      )}

      <div className="mini-feature__content">
        <div className="mini-feature__header">
          <motion.h3 
            className="mini-feature__title"
            initial={{ opacity: 0, x: layout === 'right' ? 20 : layout === 'left' ? -20 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
          >
            {data.title}
          </motion.h3>
          
          <motion.p 
            className="mini-feature__description"
            initial={{ opacity: 0, x: layout === 'right' ? 20 : layout === 'left' ? -20 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          >
            {data.description}
          </motion.p>
        </div>

        {data.features && data.features.length > 0 && (
          <>
            <div className="mini-feature__divider" />
            
            <motion.ul 
              className="mini-feature__features"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            >
              {data.features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  className="mini-feature__feature-item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.4 + (idx * 0.1) }}
                >
                  <svg 
                    className="mini-feature__check-icon" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M20 6L9 17L4 12" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}

        {data.cta && (
          <>
            <div className="mini-feature__divider" />
            
            <motion.div 
              className="mini-feature__cta"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
            >
              <ThreeDButton
                text={data.cta.text}
                variant="rectangle"
                color="primary"
                type="button"
                onClick={() => {
                  if (data.cta?.onClick) {
                    data.cta.onClick();
                  } else if (data.cta?.link) {
                    window.location.href = data.cta.link;
                  }
                }}
                icon={
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M5 12H19M19 12L12 5M19 12L12 19" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              {data.moreInfoLink && (
                <Link 
                  to={data.moreInfoLink} 
                  className="mini-feature__more-info"
                >
                  → Plus d'info de {data.title}
                </Link>
              )}
          </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MiniFeature;

