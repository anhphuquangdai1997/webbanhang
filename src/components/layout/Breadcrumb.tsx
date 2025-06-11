import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoChevronForward } from "react-icons/io5";

interface BreadcrumbItem {
    label: string;
    path: string;
}

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'Trang chủ', path: '/' },
        ...pathnames.map((value, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
            return {
                label: value === 'products' ? 'Sản phẩm' : value,
                path: path,
            };
        }),
    ];

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.path}>
                    {index > 0 && <IoChevronForward className="text-gray-400" />}
                    {index === breadcrumbItems.length - 1 ? (
                        <span className="text-gray-800 font-medium">{item.label}</span>
                    ) : (
                        <Link
                            to={item.path}
                            className="hover:text-red-500 transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
