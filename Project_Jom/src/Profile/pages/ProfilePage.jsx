import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Home,
  Loader2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wallet,
} from "lucide-react";
import ProfileHero from "../components/ProfileHero";
import InfoCard from "../components/InfoCard";
import ProfileSection from "../components/ProfileSection";
import "../profile.css";

const PROFILE_API_URL =
  "https://9pidtz8z27.execute-api.us-east-1.amazonaws.com/profile";

const SERVICE_RECOMMENDATION_RULES = [
  {
    id: "financial-support",
    title: "Financial Support",
    description:
      "Subsidies, household support, urgent assistance, and cost-of-living help.",
    icon: Wallet,
    reasons: ["Lower income band", "Family household", "General resident support"],
    match: (profile) =>
      includesAny(profile?.incomeBand, ["low", "below", "<", "1,500", "3000"]) ||
      profile?.householdType?.toLowerCase?.().includes("family") ||
      profile?.hasChildren,
  },
  {
    id: "healthcare-services",
    title: "Healthcare Services",
    description:
      "Healthcare subsidies, caregiving support, disability care, and medical cost help.",
    icon: HeartPulse,
    reasons: ["Caregiver support", "Mobility needs", "Medical subsidy support"],
    match: (profile) => profile?.caregiver || profile?.mobilityNeeds,
  },
  {
    id: "elderly-support",
    title: "Elderly Support",
    description:
      "Senior care, mobility support, active ageing, and home care services.",
    icon: UsersRound,
    reasons: ["Senior-related services", "Care needs", "Mobility support"],
    match: (profile) => Number(profile?.age) >= 60,
  },
  {
    id: "employment-skills",
    title: "Employment & Skills",
    description:
      "Jobseeker support, training programmes, internships, and skills upgrading.",
    icon: BriefcaseBusiness,
    reasons: ["Employment status", "Skills upgrading", "Career support"],
    match: (profile) =>
      includesAny(profile?.employmentStatus, [
        "unemployed",
        "jobseeker",
        "student",
        "part-time",
      ]),
  },
  {
    id: "education-support",
    title: "Education Support",
    description:
      "School, student, preschool, and child-related education assistance.",
    icon: GraduationCap,
    reasons: ["Children in household", "Family support", "Education-related help"],
    match: (profile) => profile?.hasChildren,
  },
];

function includesAny(value, keywords) {
  const text = String(value || "").toLowerCase();
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function formatValue(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (!value) return "-";

  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildRecommendations(profile) {
  const matched = SERVICE_RECOMMENDATION_RULES.filter((item) =>
    item.match(profile)
  );

  if (matched.length > 0) {
    return matched.slice(0, 3);
  }

  return SERVICE_RECOMMENDATION_RULES.filter((item) =>
    ["financial-support", "healthcare-services", "employment-skills"].includes(
      item.id
    )
  );
}

function ProfileLoader() {
  return (
    <div className="profile-page">
      <main className="profile-loader-shell">
        <div className="profile-loader-card">
          <div className="profile-loader-icon">
            <Loader2 size={34} />
          </div>

          <h1>Preparing your profile</h1>
          <p>
            We are loading your resident profile and checking which service
            areas may be relevant to you.
          </p>

          <div className="profile-loader-progress">
            <span />
          </div>

          <div className="profile-skeleton-grid">
            <div />
            <div />
            <div />
          </div>
        </div>
      </main>
    </div>
  );
}

function RecommendationCard({ recommendation, onClick }) {
  const Icon = recommendation.icon;

  return (
    <button className="profile-recommendation-card" onClick={onClick}>
      <div className="profile-recommendation-main">
        <div className="profile-recommendation-icon">
          <Icon size={22} />
        </div>

        <div>
          <h3>{recommendation.title}</h3>
          <p>{recommendation.description}</p>
        </div>
      </div>

      <div className="profile-recommendation-footer">
        <div>
          {recommendation.reasons.slice(0, 2).map((reason) => (
            <span key={reason}>{reason}</span>
          ))}
        </div>

        <ArrowRight size={18} />
      </div>
    </button>
  );
}

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setLoading(false);
          return;
        }

        const cachedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const cachedProfile = JSON.parse(
          localStorage.getItem("cachedProfile") ||
          localStorage.getItem("profile") ||
          "{}"
        );

        if (cachedProfile?.userId) {
          setUser(cachedUser);
          setProfile(cachedProfile);
        }

        const res = await fetch(`${PROFILE_API_URL}/${userId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data.user);
        setProfile(data.profile);

        localStorage.setItem(
          "cachedProfile",
          JSON.stringify({
            displayName: data.user?.displayName,
            ...data.profile,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const recommendations = useMemo(
    () => buildRecommendations(profile),
    [profile]
  );

  if (loading) {
    return <ProfileLoader />;
  }

  if (!profile?.userId) {
    return (
      <div className="profile-page">
        <main className="profile-empty">
          <div className="profile-empty-icon">
            <ShieldCheck size={30} />
          </div>
          <h1>No profile found</h1>
          <p>Please log in as a demo resident first.</p>
          <button className="profile-action-btn" onClick={() => navigate("/")}>
            Back to Login
          </button>
        </main>
      </div>
    );
  }

  const serviceRows = [
    { label: "Age", value: formatValue(profile.age) },
    { label: "Residential Status", value: formatValue(profile.residentialStatus) },
    { label: "Housing Type", value: formatValue(profile.housingType) },
    { label: "Household Type", value: formatValue(profile.householdType) },
  ];

  const householdRows = [
    { label: "Employment Status", value: formatValue(profile.employmentStatus) },
    { label: "Income Band", value: formatValue(profile.incomeBand) },
    { label: "Marital Status", value: formatValue(profile.maritalStatus) },
  ];

  const supportRows = [
    { label: "Has Children", value: formatValue(profile.hasChildren) },
    { label: "Caregiver", value: formatValue(profile.caregiver) },
    { label: "Mobility Needs", value: formatValue(profile.mobilityNeeds) },
  ];

  return (
    <div className="profile-page">
      <ProfileHero user={user} profile={profile} />

      <main className="profile-main">
        <div className="profile-column">
          <InfoCard
            title="Service Matching Profile"
            icon={<Sparkles size={20} />}
            rows={serviceRows}
          />

          <InfoCard
            title="Household Information"
            icon={<Home size={20} />}
            rows={householdRows}
          />

          <InfoCard
            title="Support Needs"
            icon={<ShieldCheck size={20} />}
            rows={supportRows}
          />
        </div>

        <div className="profile-column">
          <ProfileSection title="Recommended Service Areas">
            <p className="profile-muted-text">
              Based on your profile, these service areas may be useful starting
              points. You can still explore all services anytime.
            </p>

            <div className="profile-recommendations-list">
              {recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  onClick={() => navigate(`/services/${recommendation.id}`)}
                />
              ))}
            </div>

            <button
              className="profile-action-btn profile-action-btn-wide"
              onClick={() => navigate("/services")}
            >
              Explore All Services
              <ArrowRight size={17} />
            </button>
          </ProfileSection>

          <ProfileSection title="Privacy Note">
            <div className="profile-privacy-box">
              <ShieldCheck size={22} />
              <p className="profile-muted-text">
                This profile only stores general service-matching information
                such as age, housing type, income band, and support needs. It
                does not store NRIC, exact income, address, email, or phone
                number.
              </p>
            </div>
          </ProfileSection>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;