type primitive = boolean | null | undefined | number | string;
type jsonArray = primitive[] | jsonArray[] | jsonObject[];
type jsonObject = { [key: string]: primitive | jsonArray | jsonObject };
type json = primitive | jsonArray | { [key: string]: json };
