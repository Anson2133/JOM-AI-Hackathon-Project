import {
    DollarSign,
    HeartPulse,
    BriefcaseBusiness,
    UsersRound,
    GraduationCap,
} from "lucide-react";

export const serviceCategories = [
    {
        id: "financial-support",
        title: "Financial Support",
        description: "Financial assistance, subsidies, and household support.",
        icon: DollarSign,
    },
    {
        id: "healthcare-services",
        title: "Healthcare Services",
        description: "Healthcare subsidies, disability support, and care schemes.",
        icon: HeartPulse,
    },
    {
        id: "elderly-support",
        title: "Elderly Support",
        description: "Senior care, mobility support, and active ageing services.",
        icon: UsersRound,
    },
    {
        id: "employment-skills",
        title: "Employment & Skills",
        description: "Jobseeker support, training, internships, and employability help.",
        icon: BriefcaseBusiness,
    },
    {
        id: "education-support",
        title: "Education Support",
        description: "School, student, and learning support schemes.",
        icon: GraduationCap,
    },
    {
        id: "family-parenting-support",
        title: "Family & Parenting Support",
        description: "Parenting, child, family, and household support services.",
        icon: UsersRound,
    },
    {
        id: "childcare-education-support",
        title: "Childcare & Education Support",
        description: "Preschool, student, school, childcare, and learning support.",
        icon: GraduationCap,
    },
];

export const supportNeeds = {
    "financial-support": [
        {
            id: "urgent-financial-help",
            title: "Urgent Financial Help",
            description: "Short-term assistance for residents facing immediate financial difficulty.",
        },
        {
            id: "ongoing-household-support",
            title: "Ongoing Household Support",
            description: "Help with recurring living costs, transport, or household needs.",
        },
        {
            id: "disability-or-mobility-support",
            title: "Disability or Mobility Support",
            description: "Financial help for transport, assistive devices, or care-related needs.",
        },
        {
            id: "family-child-support",
            title: "Family or Child Support",
            description: "Support for families with children, school-going students, or young dependants.",
        },
    ],

    "healthcare-services": [
        {
            id: "healthcare-subsidies",
            title: "Healthcare Subsidies",
            description: "Support for medical bills, GP visits, dental care, and healthcare costs.",
        },
        {
            id: "disability-care-support",
            title: "Disability Care Support",
            description: "Schemes for long-term care, disability payouts, and caregiving support.",
        },
        {
            id: "caregiver-support",
            title: "Caregiver Support",
            description: "Help for residents caring for seniors or family members with care needs.",
        },
    ],

    "elderly-support": [
        {
            id: "active-ageing",
            title: "Active Ageing",
            description: "Activities, centres, and programmes for seniors to stay active.",
        },
        {
            id: "home-care",
            title: "Home Care Support",
            description: "Nursing, therapy, personal care, and medical services at home.",
        },
        {
            id: "mobility-and-assistive-devices",
            title: "Mobility & Assistive Devices",
            description: "Support for mobility aids, home safety, and enabling equipment.",
        },
        {
            id: "senior-day-care",
            title: "Senior Day Care",
            description: "Centre-based care, rehabilitation, and respite options.",
        },
    ],

    "employment-skills": [
        {
            id: "jobseeker-support",
            title: "Jobseeker Support",
            description: "Support for residents looking for work or affected by job loss.",
        },
        {
            id: "training-skills",
            title: "Training & Skills",
            description: "Skills upgrading, employability, and training support.",
        },
        {
            id: "internship-opportunities",
            title: "Internship Opportunities",
            description: "Internships and career exposure for students or young adults.",
        },
    ],

    "education-support": [
        {
            id: "student-financial-support",
            title: "Student Financial Support",
            description: "Help with school transport, learning needs, and education-related costs.",
        },
        {
            id: "early-childhood-support",
            title: "Early Childhood Support",
            description: "Support for preschool children and young families.",
        },
    ],
    "family-parenting-support": [
        {
            id: "parenting-support",
            title: "Parenting Support",
            description: "Support for parents, caregivers, and families with children.",
        },
        {
            id: "family-child-support",
            title: "Family or Child Support",
            description: "Help for families with dependants or child-related needs.",
        },
    ],

    "childcare-education-support": [
        {
            id: "student-financial-support",
            title: "Student Financial Support",
            description: "School transport, bursaries, and learning support.",
        },
        {
            id: "early-childhood-support",
            title: "Early Childhood Support",
            description: "Childcare, preschool, infant, and young child support.",
        },
    ],
};