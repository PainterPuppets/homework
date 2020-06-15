export enum Rule {
    Text = 'text',
    ProblemHeader = 'problem_header',
    Choice = 'choice',
    Hint = 'hint',
}

export const RuleMap = {
    [Rule.Text]: '',
    [Rule.ProblemHeader]: '### ',
    [Rule.Choice]: '#### 选项',
    [Rule.Hint]: '#### 解答',
}

export enum ProblemType {
    Fill = "FILL",
    Select = "SELECT",
}

export interface Problem {
    type: ProblemType,
    title: string,
    options: Array<{
        value: string,
        text: string,
    }>,
    answer: string,
    hint: string,
}

