export interface BackendCvAll {
  data: Cv[];
  status: number;
}

export interface BackendCv {
  data: Cv;
  status: number;
}

export interface Cv {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  experiences: Experiences[];
  education: Education[];
  createdAt: string;
  updatedAt: string;
}

export interface Experiences {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
