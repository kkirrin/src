import React , {useEffect, useState} from 'react';

import styles from '@/app/css/shop.module.css';

import {useStater} from '@/hooks/useStater';
import { Loader } from '@/app/components/micro/Loader';
import {useGetCategoriesQuery} from "@/redux/api/categories.api";

/**
 *
 * @param {string} string
 * @param {Array} array
 * @returns void[];
 */
const Filters = ({filter, filterSetters = f => f}) => {

    const category  = useStater('category');
    const [mobile, setMobile] = useState(false)

    const {isLoading, error, data} = useGetCategoriesQuery();

    useEffect(() => {
        if(window) {
            if(window.innerWidth > 900) {
                setMobile(false)
            } else {
                setMobile(true)
            }
        }
    })

    switch(filter){

        case 'category':

            return (!mobile) ?
                            
                                            <section className = {`${styles.filtersBlock}`}>
                                                <nav>
                                                    {
                                                        (isLoading) ? <Loader /> :
                                                            data ? data.data.map((item, index) => {
                                                                            return(
                                                                                <CategoryFilter key = {`category_${item.id}_${index}`}
                                                                                                item={item}
                                                                                                index = {item.id}
                                                                                                filterSetters = {filterSetters}
                                                                                                mobile = {mobile}
                                                                                                />
                                                                            )
                                                                        })
                                                                : <div>Категории не найдены</div>
                            
                                                    }
                                                </nav>
                                            </section>
                                         
                                          :
                                          
                                            <section className = {`${styles.filtersBlock}`}>
                                                <nav>
                                                    <h3>Категории</h3>
                                                    <select onChange = {(e) => {
                                                        filterSetters(e.target.value)
                                                    }}>
                                                    {
                                                        (isLoading) ? <option>Загрузка...</option> :
                                                            data ? data.data.map((item, index) => {
                                                                            return(
                                                                                <CategoryFilter key = {`category_${item.id}_${index}`}
                                                                                                item={item}
                                                                                                index = {item.id}
                                                                                                filterSetters = {filterSetters}
                                                                                                mobile = {mobile}
                                                                                                />
                                                                            )
                                                                        })
                                                                : <div>Категории не найдены</div>
                            
                                                    }
                                                    </select>
                                                </nav>
                                            </section>
            break;
            
        default:
            return(
                <section className = {`${styles.filtersBlock}`}>
                </section>
            )
    }
}

const CategoryFilter = ({item, index, filterSetters, mobile = false}) => {

    const [opened, setOpened] = useState(true);
    console.log(item)

    const toggleOpened = () => {
          if(item.attributes.childs.data) setOpened(!opened);
    }

    if(!mobile){
        return(
            <div key = {index} className = {`${styles.filterItem}`}>
            
                <h3 onClick = {
                    () => {
                        if(!mobile) filterSetters(item.id)
                        //if(item.attributes.childs.data) toggleOpened()  else 
                    }}
                    onTouchEnd = {() => {
                        filterSetters(item.id)
                    }}
                >{item.attributes.name}</h3>


            {
                (!item.attributes.childs.data) ? null :
                    <div className={`${styles.childCategories} ${(opened) ? styles.openedChild : styles.hiddenChild}`}>
                        {
                            (!item.attributes.childs.data) ? null :
                                        <>
                                        {
                                            item.attributes.childs.data.map((value, index) => {
                                                    return ( !value.attributes.name ) ? null :
                                                                            <li onClick = {() => {
                                                                                filterSetter(value.id)
                                                                            }}
                                                                                key = {`childKey_${value.id}_${index}`}>{value.attributes.name}</li>
                                                })
                                        }
                                        </>
                        }
                    </div>
            }
        </div>

        )} else {

        return(
            <option 
                key = {index} 
                className = {`${styles.filterItem}`}
                value = {item.id}
                >
                    {item.attributes.name}

                </option>  
        )}
}

export default Filters;
