// 将所有参数类型转换为可选
declare type optionalType<T> = {
	[K in keyof T]?: T[K];
};

// 将 null 和 undefined 从联合类型中去除
declare type NonNullType<T> = T extends null | undefined ? never : T;

// 递归将将参数类型转为可选
type DeepPartial<T extends object> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// -? 作用是如果原本属性有 ? 标记则移除它 递归将所有参数转换为必传
type DeepRequired<T extends object> = {
	[K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// 递归去除所有属性的 null 和 undefined
type DeepNonNullable<T extends object> = {
	[K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullType<T[K]>;
};
