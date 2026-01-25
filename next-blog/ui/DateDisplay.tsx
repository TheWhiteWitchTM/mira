// @/components/emoji-ui/blog/DateDisplay.tsx

import * as React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface DateDisplayProps {
	date: string;
}

export function DateDisplay({ date }: DateDisplayProps) {
	const parsedDate = parseISO(date);
	const ago = formatDistanceToNow(parsedDate, { addSuffix: true });
	const fullDate = parsedDate.toLocaleDateString();
	const isFresh = Date.now() - parsedDate.getTime() < 24 * 60 * 60 * 1000;

	return (
		<div className="flex items-start">
			<span>⏰ {ago}</span>
			<span>📅 {fullDate}</span>
			{isFresh && <Badge variant="secondary">🌟 Fresh!</Badge>}
		</div>
	);
}