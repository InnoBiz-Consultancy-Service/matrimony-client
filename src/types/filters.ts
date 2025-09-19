// types/filters.ts
export type Gender = 'male' | 'female' | '';

export interface FilterParams {
  lookingFor?: Gender;
  ageRange?: [number, number];
  division?: string;
  district?: string;
  upazila?: string;
  profession?: string;
  education?: string;
  maritalStatus?: string;
  incomeRange?: string;
}

export const defaultFilters: FilterParams = {
  lookingFor: '',
  ageRange: [18, 40],
  division: '',
  district: '',
  upazila: '',
  profession: '',
  education: '',
  maritalStatus: '',
  incomeRange: ''
};