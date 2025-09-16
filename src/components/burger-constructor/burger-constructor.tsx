import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorItemsSelector
} from '../../services/slices/constructorSlice';
import { isAuthenticatedSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  createOrder,
  isOrderRequestedSelector,
  orderResultSelector
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(isOrderRequestedSelector);
  const orderModalData = useSelector(orderResultSelector);
  const isAuth = useSelector(isAuthenticatedSelector);

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...(constructorItems.ingredients?.map((item) => item._id) || []),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
