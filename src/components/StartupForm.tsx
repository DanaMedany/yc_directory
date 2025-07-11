'use client';

import { useActionState, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { toast } from 'sonner';

import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

import { createFormSchema } from '@/lib/validation/createFormScheam';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/action';

function StartupForm() {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [pitch, setPitch] = useState('');
	const router = useRouter();

	const handleFormSubmit = async (previousState, formData: FormData) => {
		try {
			const formValues = {
				title: formData.get('title'),
				description: formData.get('description'),
				category: formData.get('category'),
				link: formData.get('link'),
				pitch,
			};

			await createFormSchema.parseAsync(formValues);

			const result = await createPitch(previousState, formData, pitch);

			if (result.status == 'SUCCESS') {
				toast('Success', {
					description: 'Your startup pitch has been created successfully',
				});

				router.push(`/startup/${result._id}`);
			}
			return result;

			//error
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErorrs = error.flatten().fieldErrors;

				setErrors(fieldErorrs as unknown as Record<string, string>);

				toast.error('Error', {
					description: 'Please check your inputs and try again',
				});

				return {
					...previousState,
					error: 'Validation failed',
					status: 'ERROR',
				};
			}
			toast.error('Error', {
				description: 'An unexpected error has occurred',
			});

			return {
				...previousState,
				error: 'An unexpected error has occurred',
				status: 'ERROR',
			};
		}
	};

	const [, formAction, isPending] = useActionState(handleFormSubmit, {
		error: '',
		status: 'INITIAL',
	});

	return (
		<form action={formAction} className="startup-form">
			<div>
				<label htmlFor="title" className="startup-form_label">
					Title
				</label>
				<Input
					id="title"
					name="title"
					className="startup-form_input"
					required
					placeholder="Startup Title"
				/>
				{errors.title && <p className="startup-form_error">{errors.title}</p>}
			</div>

			<div>
				<label htmlFor="description" className="startup-form_label">
					Description
				</label>
				<Textarea
					id="description"
					name="description"
					className="startup-form_textarea"
					required
					placeholder="Startup Description"
				/>

				{errors.description && <p className="startup-form_error">{errors.description}</p>}
			</div>

			<div>
				<label htmlFor="category" className="startup-form_label">
					Category
				</label>
				<Input
					id="category"
					name="category"
					className="startup-form_input"
					required
					placeholder="Startup Category (Tech, Health, Education...)"
				/>

				{errors.category && <p className="startup-form_error">{errors.category}</p>}
			</div>

			<div>
				<label htmlFor="link" className="startup-form_label">
					Image URL
				</label>
				<Input
					id="link"
					name="link"
					className="startup-form_input"
					required
					placeholder="Startup Image URL"
				/>

				{errors.link && <p className="startup-form_error">{errors.link}</p>}
			</div>

			<div data-color-mode="light">
				<label htmlFor="pitch" className="startup-form_label">
					Pitch
				</label>

				<MDEditor
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					id="pitch"
					preview="edit"
					height={300}
					style={{ borderRadius: 20, overflow: 'hidden' }}
					textareaProps={{
						placeholder: 'Briefly describe your idea and what problem it solves',
					}}
					previewOptions={{
						disallowedElements: ['style'],
					}}
				/>

				{errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
			</div>

			<Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit Your Pitch'}
				<Send className="size-6 ml-2" />
			</Button>
		</form>
	);
}

export default StartupForm;
