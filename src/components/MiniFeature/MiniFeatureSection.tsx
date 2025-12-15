import MiniFeature from './MiniFeature';
import type { MiniFeatureData, MiniFeatureLayout } from './MiniFeature';
import './MiniFeatureSection.css';

interface MiniFeatureSectionProps {
  features: MiniFeatureData[];
  layouts?: MiniFeatureLayout[];
}

const MiniFeatureSection = ({ features, layouts }: MiniFeatureSectionProps) => {
  const defaultLayouts: MiniFeatureLayout[] = ['vertical', 'left', 'right', 'vertical'];

  return (
    <section className="mini-feature-section">
      <div className="mini-feature-section__container">
        {features.map((feature, index) => {
          const layout = layouts?.[index] || defaultLayouts[index % defaultLayouts.length];
          return (
            <MiniFeature
              key={feature.id}
              data={feature}
              layout={layout}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MiniFeatureSection;

