import type { Router, Result } from '../../router';
export declare class RegExpRouter<T> implements Router<T> {
    middleware?: Record<string, Record<string, T[]>>;
    routes?: Record<string, Record<string, T[]>>;
    constructor();
    add(method: string, path: string, handler: T): void;
    match(method: string, path: string): Result<T> | null;
    private buildAllMatchers;
    private buildMatcher;
}
