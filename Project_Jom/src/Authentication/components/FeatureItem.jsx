function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="feature-item">
      <div className="feature-icon-circle">
        <Icon size={28} />
      </div>

      <div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
}

export default FeatureItem;