import { useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select/Select';
import { Text } from 'components/text/Text'
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState
} from '../../constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsForm = {
	onSubmit: (value: typeof defaultArticleState) => void;
	defaultState: typeof defaultArticleState;
	onReset: () => void;
}

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [formIsOpen, setFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState(props.defaultState);

	useOutsideClickClose({
		isOpen: formIsOpen,
		onChange: setFormOpen,
		onClose: () => setFormOpen(prevState => !prevState),
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton onClick={() => setFormOpen(prevState => !prevState)} isOpen={formIsOpen}/>
			<aside className={clsx(styles.container, formIsOpen && styles.container_open)} ref={formRef} >
				<form className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selectedItem) =>
							setFormState(prev => ({...prev, fontFamilyOption: selectedItem}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selectedItem) =>
							setFormState(prev => ({...prev, fontSizeOption: selectedItem}))
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selectedItem) =>
							setFormState(prev => ({...prev, fontColor: selectedItem}))
						}
					/>
					<Separator/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selectedItem) =>
							setFormState(prev => ({...prev, backgroundColor: selectedItem}))
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selectedItem) =>
							setFormState(prev => ({...prev, contentWidth: selectedItem}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={(event) => {
								event.preventDefault();
								props.onReset();
								setFormState(defaultArticleState)}
							}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={(event) => {
								event.preventDefault();
								props.onSubmit(formState)}
							}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
