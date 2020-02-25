/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

export const Operators: { [key: string]: string } = {
    OR: ',',
    AND: ';',
    GT: '=gt=',
    GE: '=ge=',
    LT: '=lt=',
    LE: '=le=',
    EQ: '==',
    NEQ: '!=',
};

export type Primitives = boolean | string | number;

/**
 * Utility to reduce the verbosity required when creating complex query filter expressions.
 *
 * Usage:
 * const builder = new FilterBuilder();
 * const filter = builder
 *          .is("isVappTemplate").equalTo(true)
 *          .and()
 *          .is("vcd").equalTo(vcdId)
 *          .and().or(
 *              builder.is("created").before(userInputDate),
 *              builder.is("uptime").greaterThan(user)
 *          );
 *
 * Will produce:
 * isVappTemplate==true;vcd==some-urn-here;(created=lt=DATETIME,uptime=gt=3600000)
 */
export class FilterBuilder {
    private result = '';
    private parent: FilterBuilder;
    private currentOperator: string;

    constructor(parent: FilterBuilder = null) {
        this.parent = parent;
    }

    /**
     * Initialize a filter expression
     *  property
     * @returns The created FilterBuilder instance
     */
    public is(property: string): FilterBuilder {
        const fb = new FilterBuilder(this);
        fb.result = property;
        return fb;
    }

    /**
     * Create a string representing the filter parameter to be used in a query
     * @returns the filter expression
     */
    public getString(): string {
        const query = this.buildPartial();
        return query;
    }

    /**
     * Conjunct expressions
     *  conditions
     * @returns The FilterBuilder instance
     */
    public and(...conditions: FilterBuilder[]): FilterBuilder {
        if (!conditions.length) {
            if (
                this.currentOperator === Operators.OR ||
                (this.parent && this.parent.currentOperator === Operators.OR)
            ) {
                if (this.parent) {
                    this.parent.result = '(' + this.parent.result;
                    this.result += ')';
                } else {
                    this.wrap();
                }
                this.currentOperator = Operators.AND;
            }
            this.result += Operators.AND;
        } else {
            this.result += '(';
            const first = conditions.shift();
            let partial = first.buildPartial();

            conditions.forEach(condition => {
                partial += Operators.AND + condition.buildPartial();
            });

            this.result += partial + ')';
        }
        return this;
    }

    /**
     * Top level AND operator
     *  conditions
     * @returns The FilterBuilder instance
     */
    public all(...conditions: FilterBuilder[]): FilterBuilder {
        if (conditions.length) {
            const first = conditions.shift();
            let partial = first.buildPartial();

            conditions.forEach(condition => {
                partial += Operators.AND + condition.buildPartial();
            });

            this.result += partial;
        }

        return this;
    }

    /**
     * Disjunct expressions
     *  conditions
     * @returns The FilterBuilder instance
     */
    public or(...conditions: FilterBuilder[]): FilterBuilder {
        if (!conditions.length) {
            if (
                this.currentOperator === Operators.AND ||
                (this.parent && this.parent.currentOperator === Operators.AND)
            ) {
                if (this.parent) {
                    this.parent.result = '(' + this.parent.result;
                    this.result += ')';
                } else {
                    this.wrap();
                }
                this.currentOperator = Operators.OR;
            }
            this.result += Operators.OR;
        } else {
            this.result += '(';
            const first = conditions.shift();
            let partial = first.buildPartial();

            conditions.forEach(condition => {
                partial += Operators.OR + condition.buildPartial();
            });

            this.result += partial + ')';
        }
        return this;
    }

    /**
     * Top level OR operator
     * conditions
     * @returns The FilterBuilder instance
     */
    public any(...conditions: FilterBuilder[]): FilterBuilder {
        if (conditions.length) {
            const first = conditions.shift();
            let partial = first.buildPartial();
            first.clear();

            conditions.forEach(condition => {
                partial += Operators.OR + condition.buildPartial();
                condition.clear();
            });
            this.result += partial;
        }

        return this;
    }

    /**
     * Wrap the current expression in ()
     * @returns The FilterBuilder instance
     */
    public wrap(): FilterBuilder {
        this.result = '(' + this.result + ')';
        this.currentOperator = null;
        return this;
    }

    /**
     * Match a filter expression to be equal to a value
     * @returns The FilterBuilder instance
     */
    public equalTo(value: Primitives, ...moreValues: Primitives[]): FilterBuilder {
        return this.condition(Operators.EQ, value, ...moreValues);
    }

    /**
     * Match a filter expression to be different to a value
     * @returns The FilterBuilder instance
     */
    public notEqualTo(value: Primitives, ...moreValues: Primitives[]): FilterBuilder {
        return this.condition(Operators.NEQ, value, ...moreValues);
    }

    /**
     * Match a filter expression to be less than a value
     * @returns The FilterBuilder instance
     */
    public lessThan(value: number): FilterBuilder {
        return this.condition(Operators.LT, value);
    }

    /**
     * Match a filter expression to be less than or equal to a value
     * @returns The FilterBuilder instance
     */
    public lessThanOrEqualTo(value: number): FilterBuilder {
        return this.condition(Operators.LE, value);
    }

    /**
     * Match a filter expression to be greater than a value
     * @returns The FilterBuilder instance
     */
    public greaterThan(value: number): FilterBuilder {
        return this.condition(Operators.GT, value);
    }

    /**
     * Match a filter expression to be greater than or equal to a value
     * @returns The FilterBuilder instance
     */
    public greaterThanOrEqualTo(value: number): FilterBuilder {
        return this.condition(Operators.GE, value);
    }

    /**
     * Match a filter expression to be before a date
     * @returns The FilterBuilder instance
     */
    public before(date: Date): FilterBuilder {
        return this.condition(Operators.LT, date.toISOString());
    }

    /**
     * Match a filter expression to be after a date
     * @returns The FilterBuilder instance
     */
    public after(date: Date): FilterBuilder {
        return this.condition(Operators.GT, date.toISOString());
    }

    /**
     * Match a filter expression to be between two numbers.
     * Lower limit is greater or equal and upper limit is less or equal.
     * If for either of the limit is not provided value, the limit is not included in the filter expression.
     * @returns The FilterBuilder instance
     */
    public betweenNumbers(values: number[]): FilterBuilder {
        const builders: FilterBuilder[] = [];

        if (values[0]) {
            builders.push(new FilterBuilder().is(this.result).condition(Operators.GE, values[0]));
        }

        if (values[1]) {
            builders.push(new FilterBuilder().is(this.result).condition(Operators.LE, values[1]));
        }

        return new FilterBuilder().is('').and(...builders);
    }

    private condition(operator: string, value: Primitives, ...moreValues: Primitives[]): FilterBuilder {
        const name = this.result;
        this.result += (operator + value) as string;
        if (moreValues.length) {
            moreValues.forEach(val => {
                this.result += (',' + name + operator + val) as string;
            });
            this.currentOperator = Operators.OR;
        }
        return this;
    }

    private clear(): void {
        this.result = '';
        this.currentOperator = '';
        if (this.parent) {
            this.parent.clear();
            this.parent = null;
        }
    }

    private buildPartial(): string {
        if (this.parent) {
            return `${this.parent.buildPartial()}${this.result}`;
        } else {
            return this.result;
        }
    }
}
