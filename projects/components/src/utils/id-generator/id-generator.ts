/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Generates unique IDs
 */
export class IdGenerator {
    private static idCounter = 0;

    /**
     * Getter that returns the a unique ID
     */
    generate(): string {
        return `${this.prefix}-${IdGenerator.idCounter++}`;
    }

    /**
     * The string to be prefixed for {@link IdGenerator#id} returned
     */
    constructor(private prefix: string) {}
}
