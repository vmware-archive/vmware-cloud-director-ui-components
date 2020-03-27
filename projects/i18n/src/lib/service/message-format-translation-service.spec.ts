/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2017 VMware, Inc. All rights reserved. VMware Confidential
 */
import { BehaviorSubject } from 'rxjs';
import { TranslationLoader } from '../loader/translation-loader';
import { MessageFormatTranslationService } from './message-format-translation-service';

describe('MessageFormatTranslationService', () => {
    const translationSet = {
        es: {
            'vm.status':
                '{NUM_VMS, plural, =0{0 VMs están} one{# VM está} other{# VMs están}} ' +
                '{GENDER, select, male{}' +
                'female{{NUM_VMS, plural, ' +
                '=0{lista}' +
                'one{lista}' +
                'other{listas}}} other{}}',
            'user.status':
                '{NUM_VMS, plural, =0{0 user están} one{# user está} other{# user están}} ' +
                '{GENDER, select, male{' +
                '{NUM_VMS, plural, ' +
                '=0{listo} ' +
                'one{listo} ' +
                'other{listos}}} ' +
                'female{} other{}}',
        },
        en: {
            'vm.status': '{NUM_VMS, plural, =0{0 VMs} one{# VM} other{# VMs}} are ready',
            'single.param': 'Hello {name}',
            'multiple.params': '{count, plural,' + '=0{no {name}s}' + 'one{one {name}}' + 'other{many {name}s}}',
            'vm.computePolicy.compliance':
                '{count, plural, =0{VM does not comply with compute policies}' +
                'one{VM does not comply with compute policy "{0}"}' +
                'other{VM does not comply with compute policies "{0}" and "{1}"}}',
        },
        fr: {},
    };

    const backupTranslationSet = {
        es: {},
        en: {
            hello: 'Hello!',
        },
    };

    it('translates the string using the provided gender in preferred locale', () => {
        const translationService = new MessageFormatTranslationService('es', 'en');
        translationService.registerTranslations(translationSet);
        const femaleSingular = translationService.translate('vm.status', [{ NUM_VMS: 1, GENDER: 'female' }]);
        expect(femaleSingular).toBe('1 VM está lista');

        const femalePlural = translationService.translate('vm.status', [{ NUM_VMS: 2, GENDER: 'female' }]);
        expect(femalePlural).toBe('2 VMs están listas');

        const maleSingular = translationService.translate('user.status', [{ NUM_VMS: 1, GENDER: 'male' }]);
        expect(maleSingular).toBe('1 user está listo');

        const malePlural = translationService.translate('user.status', [{ NUM_VMS: 2, GENDER: 'male' }]);
        expect(malePlural).toBe('2 user están listos');
    });

    it('translates the string using the fallback locale' + 'when the preferred locale does not have the string', () => {
        const translationService = new MessageFormatTranslationService('fr', 'en');
        translationService.registerTranslations(translationSet);
        const result = translationService.translate('vm.status', [{ NUM_VMS: '0' }]);
        expect(result).toBe('0 VMs are ready');
    });

    it('translates the string using the provided single param and multiple params', () => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        translationService.registerTranslations(translationSet);
        expect(translationService.translate('single.param', [{ name: 'World' }])).toBe(`Hello World`);
        expect(translationService.translate('multiple.params', [{ count: 0, name: 'World' }])).toBe(`no Worlds`);
        expect(translationService.translate('multiple.params', [{ count: 1, name: 'World' }])).toBe(`one World`);
        expect(translationService.translate('multiple.params', [{ count: 2, name: 'World' }])).toBe(`many Worlds`);
    });

    it('translates the string via the translation loader via combined translation', () => {
        const loader = new TranslationLoader(null, '');
        spyOn(loader, 'getCombinedTranslation').and.returnValue(
            new BehaviorSubject({
                en: {
                    hi: 'hello',
                },
            })
        );
        const translationService = new MessageFormatTranslationService('en', 'en', loader, true);
        translationService.registerTranslations();
        translationService.translateAsync('hi').subscribe(result => {
            expect(result).toEqual('hello');
        });
    });

    it('translates the string via the translation loader via single language translation', () => {
        const loader = new TranslationLoader(null, '');
        spyOn(loader, 'getTranslation').and.returnValue(
            new BehaviorSubject({
                hi: 'hello',
            })
        );
        const translationService = new MessageFormatTranslationService('en', 'en', loader);
        translationService.registerTranslations();
        translationService.translateAsync('hi').subscribe(result => {
            expect(result).toEqual('hello');
        });
    });

    it('translates the string using the provided multiple object keys', () => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        translationService.registerTranslations(translationSet);
        const getPolicySize = (count: number) => [{ count, 0: 'Oracle Sizing', 1: 'Oracle Placement' }];
        expect(translationService.translate('vm.computePolicy.compliance', getPolicySize(0))).toBe(
            `VM does not comply with compute policies`
        );
        expect(translationService.translate('vm.computePolicy.compliance', getPolicySize(1))).toBe(
            `VM does not comply with compute policy "Oracle Sizing"`
        );
        expect(translationService.translate('vm.computePolicy.compliance', getPolicySize(2))).toBe(
            `VM does not comply with compute policies "Oracle Sizing" and "Oracle Placement"`
        );
    });

    it('can format dates properly', () => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        const date = new Date('1999/05/05');
        expect(translationService.formatDate(date)).toEqual('05/05/1999');
        expect(
            translationService.formatDate(date, {
                month: 'short',
            })
        ).toEqual('May');
    });

    it('can format times properly', () => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        const date = new Date('1999/05/05');
        expect(translationService.formatTime(date)).toEqual('12:00:00 AM');
        expect(
            translationService.formatTime(date, {
                hour: '2-digit',
            })
        ).toEqual('12 AM');
    });

    it('can format date-times properly', () => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        const date = new Date('1999/05/05');
        expect(translationService.formatDateTime(date)).toEqual('05/05/1999, 12:00:00 AM');
        expect(
            translationService.formatDateTime(date, {
                month: 'short',
                hour: '2-digit',
            })
        ).toEqual('May, 12 AM');
    });
});
