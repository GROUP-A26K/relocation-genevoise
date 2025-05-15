import { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix,
  routes: {
    assistance: { fr: '/assistance', en: '/support' },
    personalData: { fr: '/donnes-personnelles', en: '/personal-data' },
    legalNotice: { fr: '/mentions-legales', en: '/legal-notice' },
    callMe: { fr: '/rappelez-moi', en: '/call-me' },
    personalInsurance: {
      fr: '/particulier/assurance',
      en: '/personal/insurance',
    },
    personalPetInsurance: {
      fr: '/particulier/assurance/assurance-animaux',
      en: '/personal/insurance/pet-insurance',
    },
    personalPropertyAssetInsurance: {
      fr: '/particulier/assurance/assurance-choses-et-patrimoine',
      en: '/personal/insurance/property-asset-insurance',
    },
    personalDomesticEmployeeInsurance: {
      fr: '/particulier/assurance/assurance-employe-maison',
      en: '/personal/insurance/domestic-employee-insurance',
    },
    personalCrossBorderInsurance: {
      fr: '/particulier/assurance/assurance-frontalier',
      en: '/personal/insurance/cross-border-insurance',
    },
    personalVestedBenefitsInsurance: {
      fr: '/particulier/assurance/assurance-libre-passage',
      en: '/personal/insurance/vested-benefits-insurance',
    },
    personalProvidentInsurance: {
      fr: '/particulier/assurance/assurance-prevoyance',
      en: '/personal/insurance/provident-insurance',
    },
    personalLegalProtectionInsurance: {
      fr: '/particulier/assurance/assurance-protection-juridique',
      en: '/personal/insurance/legal-protection',
    },
    personalBuildingLiabilityInsurance: {
      fr: '/particulier/assurance/assurance-rc-immeuble',
      en: '/personal/insurance/building-liability',
    },
    personalLiabilityInsurance: {
      fr: '/particulier/assurance/assurance-rc-menage',
      en: '/personal/insurance/personal-liability',
    },
    personalVehicleInsurance: {
      fr: '/particulier/assurance/assurance-vehicule',
      en: '/personal/insurance/vehicle-insurance',
    },
    personalLifeInsurance: {
      fr: '/particulier/assurance/assurance-vie',
      en: '/personal/insurance/life-insurance',
    },
    personalTravelInsurance: {
      fr: '/particulier/assurance/assurance-voyage',
      en: '/personal/insurance/travel-insurance',
    },
    personalMortgage: {
      fr: '/particulier/hypotheque',
      en: '/personal/mortgage',
    },
    personalPensionPlanning: {
      fr: '/particulier/prevoyance',
      en: '/personal/pension-planning',
    },
    personalHealth: {
      fr: '/particulier/sante',
      en: '/personal/health',
    },
    personalTaxation: {
      fr: '/particulier/taxes-et-fiscalite',
      en: '/personal/taxation',
    },

    businessLanding: {
      fr: '/professionnel/entreprise',
      en: '/professional/business',
    },
    businessAccidentInsuranceLaa: {
      fr: '/professionnel/entreprise/assurance-accident-laa',
      en: '/professional/business/accident-insurance-laa',
    },
    businessCyberInsurance: {
      fr: '/professionnel/entreprise/assurance-cyber',
      en: '/professional/business/cyber-insurance',
    },
    businessKeyPersonInsurance: {
      fr: '/professionnel/entreprise/assurance-homme-cle',
      en: '/professional/business/key-person-insurance',
    },
    businessInterruptionInsurance: {
      fr: '/professionnel/entreprise/assurance-perte-exploitation',
      en: '/professional/business/business-interruption-insurance',
    },
    businessLossOfEarningsInsurance: {
      fr: '/professionnel/entreprise/assurance-perte-gain',
      en: '/professional/business/loss-of-earnings-insurance',
    },
    businessBondsGuarantees: {
      fr: '/professionnel/entreprise/cautions-garanties',
      en: '/professional/business/bonds-guarantees',
    },
    businessOccupationalPensionLpp: {
      fr: '/professionnel/entreprise/prevoyance-professionnelle-lpp',
      en: '/professional/business/occupational-pension-lpp',
    },
    businessLegalProtection: {
      fr: '/professionnel/entreprise/protection-juridique',
      en: '/professional/business/legal-protection',
    },
    businessProfessionalLiability: {
      fr: '/professionnel/entreprise/rc-professionnelle',
      en: '/professional/business/professional-liability',
    },

    businessInternational: {
      fr: '/professionnel/international',
      en: '/professional/international',
    },
    businessInternationalHealthInsurance: {
      fr: '/professionnel/international/assurance-maladie-international',
      en: '/professional/international/health-insurance',
    },
    businessInternationalSpecificCoverages: {
      fr: '/professionnel/international/couvertures-specifiques',
      en: '/professional/international/specific-coverages',
    },
    businessSelfEmployed: {
      fr: '/professionnel/profession-liberale',
      en: '/professional/self-employed-profession',
    },
    businessSelfEmployedInsuranceCoverage: {
      fr: '/professionnel/profession-liberale/couvertures-dediees',
      en: '/professional/self-employed-profession/dedicated-coverages',
    },
  },
};
