import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import useAxiosFetch from '../../utils/useFetch';
import CategoryItem from './CategoryItem'

function Categories() {


    const [categories, setCategories] = useState([]);
    let { data, loading, error } = useAxiosFetch("/admin/categories");

    useEffect(() => {
        if (!loading)
            setCategories(data.categories)
    }, [data])

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Link
                    to="/categories/add"
                    className="inline-flex items-center justify-center
                 whitespace-nowrap rounded-md text-sm font-medium 
                 ring-offset-background transition-colors focus-visible:outline-none 
                 focus-visible:ring-2 focus-visible:ring-ring 
                 focus-visible:ring-offset-2 disabled:pointer-events-none
                  disabled:opacity-50 bg-green-600 text-white
                   hover:bg-green-600/90 h-10 px-4 py-2">
                    Add Category
                </Link>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&amp;_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                    Image
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                    Name
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                    Description
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                    Items
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&amp;_tr:last-child]:border-0">

                            {
                                !loading && categories.map((category_item) => (
                                    <CategoryItem setCategories={setCategories} categories={categories} category={category_item} key={category_item.id} />
                                ))

                            }
                        </tbody>
                    </table>

                    {
                        loading &&
                        <div className='p-5'>
                            <Loading width={10} height={10} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Categories
