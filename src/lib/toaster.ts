import { toast } from 'svoast';

export async function launchToast(msg: string, type: string) {
	if (type === 'info') {
		toast.info(msg, {
			closable: true
		});
	} else if (type === 'success') {
		toast.success(msg, {
			closable: true
		});
	} else if (type === 'warning') {
		toast.warning(msg, {
			closable: true
		});
	} else if (type === 'error') {
		toast.error(msg, {
			closable: true
		});
	} else {
		toast.info(msg, {
			closable: true
		});
	}
}
