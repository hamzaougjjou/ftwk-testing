import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import TextTruncator from '../../utils/TextTruncator'
import { api_url, header_auth_options } from '../../utils/Vars';

function CategoryItem({ category, setCategories, categories }) {

    const [showDeletePopUp, setShowDeletePopUp] = useState(false);

    const handleDelete = () => {
        // alert("DELETE CATEGORY WITH ID " + category.id);
        setShowDeletePopUp(true);
    }
    return (
        <>
            {
                showDeletePopUp && <ConfirmDelete
                    setCategories={setCategories}
                    categories={categories}
                    id={category.id}
                    setShowDeletePopUp={setShowDeletePopUp}
                />
            }
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="rounded-md w-[90px] h-[150px] object-fitt"

                    />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    <TextTruncator text={category.name} len={20} />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <TextTruncator text={category.description} len={120} />
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    {category.items_count}
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/categories/${category.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                            </svg>
                        </Link>
                        <button
                            onClick={() => handleDelete()}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="h-4 w-4"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CategoryItem

const ConfirmDelete = ({ setShowDeletePopUp, id , setCategories, categories }) => {

    const [loading, setLoading] = useState(false);

    const handelDeletion = async () => {
        setLoading(true);
        await axios.delete(api_url + "/admin/categories/" + id, header_auth_options)
            .then(res => {
                console.log('====================================');
                console.log(res.data);
                console.log('====================================');

                setCategories( categories.filter(item => item.id !== id ) )

            }).catch(err => {
                alert("error to delete this category , try again")
            }).finally(() => {
                setLoading(false);
                setShowDeletePopUp(false);
            })
    }

    return (
        <>
            {/* // <!-- Main modal --> */}
            <div id="deleteModal" tabindex="-1"
                aria-hidden="true"
                className="flex bg-[#12121270]
                overflow-y-auto overflow-x-hidden 
                fixed top-0 right-0 left-0 z-50 justify-center 
                items-center w-full md:inset-0 h-modal md:h-full">
                <div
                    className="relative p-4 w-full max-w-md h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div
                        className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button type="button"
                            onClick={() => setShowDeletePopUp(false)}
                            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                            <svg aria-hidden="true"
                                className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"><path
                                    fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span
                                className="sr-only">Close</span>
                        </button>
                        <svg
                            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 
                            002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 
                            0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"></path></svg>
                        <p
                            className="mb-4 text-gray-500 dark:text-gray-300">
                            Are you sure you want to delete this Category?</p>
                        <div
                            className="flex justify-evenly items-center w-full">
                            <button
                                onClick={() => setShowDeletePopUp(false)}
                                type="button"
                                className="py-2 px-3 text-sm font-medium
                                text-gray-500 bg-white rounded-lg border 
                                border-gray-200 hover:bg-gray-100 focus:outline-none 
                                hover:text-gray-900 focus:z-10 dark:bg-gray-700
                                ">
                                No, cancel
                            </button>
                            {
                                loading ?
                                    <button type="button"
                                        className="py-2 flex gap-1 px-3 text-sm font-medium text-center 
                                text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none 
                                dark:bg-red-500 dark:hover:bg-red-600 cursor-disbled opacity-[0.8]">
                                       <Loading width={5} height={5} text="" />
                                        Yes, I'm sure
                                    </button>
                                    :
                                    <button type="submit"
                                        onClick={() => handelDeletion()}
                                        className="py-2 px-3 text-sm font-medium text-center 
                                text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none 
                                dark:bg-red-500 dark:hover:bg-red-600">
                                        Yes, I'm sure
                                    </button>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}