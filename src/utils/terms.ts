import Api from '@/components/Api';
import { ITerm, ResponseDTO } from '@/interfaces/api';
import { termsList } from '@/interfaces/sign';

/**
 * 이용약관 가져오기
 * @returns
 */
export const handleGetTerms = async () => {
  const response: ResponseDTO<ITerm[]> = await Api.getTerms();
  const updatedTerms: termsList = {
    service: '',
    privacy: '',
    provision: '',
    financial: '',
    location: '',
  };
  if (response.result) {
    response.data?.map((idx: any) => {
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
