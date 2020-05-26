import { LangEnum } from '../../i18n/lang.enum';
import DropdownOptionInterface from '../interfaces/dropdown-option.interface';

class UtilsService {
  getDateFormat(culture: string): string {
    switch (culture) {
      case LangEnum.EN_US:
        return 'MM/DD/YYYY';
      case LangEnum.EN_GB:
      case LangEnum.ES_ES:
      case LangEnum.CA_ES:
      default:
        return 'DD/MM/YYYY';
    }
  }

  convertToDropdown(list: any[], dropdownProperties: string[]): DropdownOptionInterface[] {
    return (
      list.map &&
      list.map((data: any) => {
        return {
          key: data[dropdownProperties[0]],
          text: data[dropdownProperties[1]],
        };
      })
    );
  }

  checkFileSize(files: FileList, maxSize: number) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i);
        if (file && file.size > maxSize) {
          return { id: 'shared.upload.validations.maxSize', values: [(maxSize / 1000000).toFixed(2)] };
        }
      }
    }
  }

  checkFileName(files: FileList, nameLength: number) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file: File | null = files.item(i);
        if (file && file.name.length > nameLength) {
          return { id: 'shared.upload.validations.nameLength', values: [nameLength.toString()] };
        }
      }
    }
  }
}

export const utilsService = new UtilsService();
