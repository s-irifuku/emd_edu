
// 支店マスタ
export class BranchList {
  branchIdList: string[];//支店ID
  branchNameList: string[];//支店名
}
// 部署マスタ
export class DepartmentList {
  departmentIdList: string[];//部署ID
  departmentNameList: string[];//部署名
}

// 一覧表示
export class EmpList {
  idList: string[];//従業員ID
　nameList: string[];//従業員名
　dateList: string[];//入社年月日
}

// 詳細表示
export class EmpDetail {
  jpnsName: string;// 名前
  jpnsKana: string;// ふりがな
  romaName: string;// name
  postalCode: string;// 郵便番号
  address: string;// 住所
  telNo: string;// 電話番号
  mailAddress: string;// メールアドレス
  sex: string;// 性別
  birthDate: string;// 生年月日
  finalEducation: string;// 最終学歴
  joinDate: string;// 入社年月日
  companyMailAddress: string;// 自社メールアドレス
  employeeId: string;// 従業員ID
  photoImage: string;// 写真
  branchName: string;// 支店
  departmentName: string;// 部署
}
