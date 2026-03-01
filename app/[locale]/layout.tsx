import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Tajawal, Inter } from 'next/font/google';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';
import MobileLayout from '@/components/mobile/MobileLayout';
import '../globals.css';

const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['400', '500', '700', '800', '900'],
    variable: '--font-tajawal'
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'nav' });
    return {
        title: t('home') + ' | بصمة',
        description: 'وكالة مصرية رائدة في تطوير المواقع وأتمتة الأعمال بالذكاء الاصطناعي.',
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const isAr = locale === 'ar';

    return (
        <html lang={locale} dir={isAr ? 'rtl' : 'ltr'}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="بصمة" />
                <meta name="theme-color" content="#E8432D" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </head>
            <body className={`${isAr ? tajawal.variable : inter.variable} ${tajawal.className} bg-dark text-white antialiased selection:bg-accent/30 min-h-screen flex flex-col`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Preloader />
                    <CustomCursor />
                    <MobileLayout locale={locale}>
                        {children}
                    </MobileLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
