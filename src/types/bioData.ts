export interface IBiodata {
  _id?: string;
  userId: string;
  name: string;
  description: string;

  address?: {
    present?: {
      division?: string;
      district?: string;
      upazila?: string;
      details?: string;
    };
    permanent?: {
      division?: string;
      district?: string;
      upazila?: string;
      details?: string;
    };
    country?: string;
  };

  education?: {
    sscYear?: string;
    sscGroup?: string;
    sscResult?: string;
    hscYear?: string;
    hscGroup?: string;
    hscResult?: string;
    honours?: string;
  };

  familyInfo?: {
    fatherAlive?: string;
    fatherOccupation?: string;
    motherAlive?: string;
    motherOccupation?: string;
    brothers?: string;
    sisters?: string;
    siblingsDetails?: string;
  };

  personalInfo?: {
    beard?: string;
    salat?: string;
    mahramTravel?: string;
    health?: string;
    disability?: string;
  };

  physicalInfo?: {
    height?: string;
    bodyColor?: string;
    bloodGroup?: string;
    weight?: string;
  };

  maritalInfo?: {
    maritalStatus?: string;
    childAllow?: string;
    whyWantToMarry?: string;
    futurePlan?: string;
  };

  contactInfo: {
    phone: string;
    email?: string;
    facebook?: string;
  };

  preference?: {
    ageRange?: string;
    educationLevel?: string;
    maritalStatus?: string;
    religiousPractice?: string;
    physicalAppearance?: string;
    additionalQualities?: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}