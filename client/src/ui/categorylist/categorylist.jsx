import React, { useState, useEffect } from 'react'
import CategoryItem from "@/ui/categoryitem/categoryitem"
import Data from '@/shared/Data';

const CategoryList= ({setSelectedCategory}) =>{
    const [category,setCategory]=useState();
    const [selectedCategory,setSelectedCategory_]=useState();

    useEffect(()=>{
        setCategory(Data.CategoryListData)
    },[])

return (
    <div className='p-2 md:pd-6 border-[2px] rounded-xl mb-3'>
        <h2 className='text-[20px] font-bold mb-3'>Select Parking Spaces</h2>
        {category? <div className='flex gap-6 mb-1.5'>
            {category?.map((item,index)=>(
                <div key={index} onClick={()=>{setSelectedCategory(item.value);setSelectedCategory_(item)}}>
                <CategoryItem category={item} selectedCategory={selectedCategory} />
            </div>
            ))}
        </div>:null}
    </div>
)
}

export default CategoryList;