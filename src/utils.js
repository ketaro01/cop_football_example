import * as R from "ramda";

let delayId = null;

export function delay(seconds, func) {
  delayId = setTimeout(func, seconds * 1000);
}

export const dGroup = (columns, data) => {
  const result = R.pipe(
    R.map(R.props(columns)),
    R.map(JSON.stringify),
    R.uniq,
    R.map(JSON.parse),
    R.map(R.zipObj(columns))
  )(data);
  return result;
};

// data sorting + asc, desc 기능 추가
// * array JSON 형식의 데이터를 요청한 컬럼들을 기준으로 정렬하여 리턴
// 컬럼명 끝에 :R 을 추가 시 해당 컬럼은 desc 처리
// ex) dSortWith(["AColumn:D", "BColumn"], arrayJson);
export const dSortWith = (columns, data) => {
  const colItems = columns.map((item, i) => {
    return item.indexOf(":D") === -1
      ? R.ascend(R.prop(item))
      : R.descend(R.prop(item.replace(":D", "")));
  });

  return R.sortWith(colItems, data);
};

// data Filter
// * AND 연산으로 컬럼의 벨류값들이 정확히 일치하는 행을 array JSON 형식으로 리턴
// ex) dFilter([{"AColumn": "a"}, {"BColumn": "b"}], arrayJson);
// return => [{"AColumn" : "a", "BColumn": "b", "CColumn" : "c"}]
export const dFilter = (fieldName, data) => {
  let tmpData = data;

  fieldName.map(item => {
    if (item[Object.keys(item)[0]] !== "") {
      tmpData = R.filter(
        R.propEq(Object.keys(item)[0], item[Object.keys(item)[0]])
      )(tmpData);
    }
  });

  return tmpData;
};

export const dFilterDate = (fieldName, data) => {
  let tmpData = data;
  const dateCheck = date => {
    console.log(date);
    return new Date(date).getFullYear() >= new Date().getFullYear();
  };

  fieldName.map(item => {
    if (item[Object.keys(item)[0]] !== "") {
      tmpData = R.filter(R.propSatisfies(dateCheck, Object.keys(item)[0]))(
        tmpData
      );
    }
  });

  return tmpData;
};
