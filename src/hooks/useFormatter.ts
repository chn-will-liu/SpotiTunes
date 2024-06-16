import { useRef } from 'react';

export class LocalisationFormatter {
    private readonly localeId: string = navigator.language ?? 'en-US';
    private readonly numberFormatter: Intl.NumberFormat = new Intl.NumberFormat(this.localeId);

    public formatNumber(number: number): string {
        return this.numberFormatter.format(number);
    }

    public formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        return date.toLocaleDateString(this.localeId, options);
    }
}

export const useFormatter = () => {
    const formatter = useRef(new LocalisationFormatter());
    return formatter.current;
};
