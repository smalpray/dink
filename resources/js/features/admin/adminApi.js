import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { ADMIN_SECTIONS } from './adminData';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['AdminSection'],
    endpoints: (builder) => ({
        getAdminSection: builder.query({
            queryFn: ({ section }) => {
                const data = ADMIN_SECTIONS[section];

                if (!data) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: `No admin demo data is defined for "${section}".`,
                        },
                    };
                }

                return { data };
            },
            providesTags: (_result, _error, { section }) => [
                { type: 'AdminSection', id: section },
            ],
        }),
    }),
});

export const { useGetAdminSectionQuery } = adminApi;
