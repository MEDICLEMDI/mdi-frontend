import Api from '@/components/Api';
import { responseDTO } from '@/interfaces/api';
import { termsList } from '@/interfaces/sign';

export const handleGetTerms = async () => {
  const response: responseDTO = await Api.getTerms();
  const updatedTerms: termsList = {
    service: '',
    privacy: '',
    provision: '',
    financial: '',
    location: '',
  };
  if (response.result) {
    response.data.map((idx: any) => {
      let termsType: keyof termsList;
      switch (idx.id) {
        case '1':
          termsType = 'service';
          break;
        case '2':
          termsType = 'privacy';
          break;
        case '3':
          termsType = 'provision';
          break;
        case '4':
          termsType = 'financial';
          break;
        case '5':
          termsType = 'location';
          break;
      }
      updatedTerms[termsType!] = idx.tm_ext_link;
    });
  }
  return updatedTerms;
};
