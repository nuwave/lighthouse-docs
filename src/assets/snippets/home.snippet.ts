export const topSnippet = `
<div class="gatsby-highlight">
      <pre class="language-graphql"><code class="language-graphql">type User <span class="token punctuation">{</span>
  <span class="token attr-name">id</span><span class="token punctuation">:</span> ID<span class="token operator">!</span>
  <span class="token attr-name">name</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">email</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">posts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Post<span class="token punctuation">]</span><span class="token operator">!</span> <span class="token directive function">@hasMany</span>
<span class="token punctuation">}</span>

type Post <span class="token punctuation">{</span>
  <span class="token attr-name">title</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">content</span><span class="token punctuation">:</span> String<span class="token operator">!</span>
  <span class="token attr-name">author</span><span class="token punctuation">:</span> User<span class="token operator">!</span> <span class="token directive function">@belongsTo</span>
<span class="token punctuation">}</span>

type Query <span class="token punctuation">{</span>
  <span class="token attr-name">me</span><span class="token punctuation">:</span> User <span class="token directive function">@auth</span>
<span class="token punctuation">}</span>
</code></pre>
</div>
`;

export const bottomSnippet = `
<div class="gatsby-highlight">
      <pre class="language-graphql"><code class="language-graphql">type Query <span class="token punctuation">{</span>
  <span class="token attr-name">me</span><span class="token punctuation">:</span> User <span class="token directive function">@auth</span>
  <span class="token attr-name">posts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Post<span class="token operator">!</span><span class="token punctuation">]</span><span class="token operator">!</span> <span class="token directive function">@paginate</span><span class="token punctuation">(</span><span class="token attr-name">model</span><span class="token punctuation">:</span> <span class="token string">"User"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

type Mutation <span class="token punctuation">{</span>
  createPost<span class="token punctuation">(</span>
    <span class="token attr-name">title</span><span class="token punctuation">:</span> String<span class="token operator">!</span> <span class="token directive function">@validate</span><span class="token punctuation">(</span><span class="token attr-name">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"min:2"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token attr-name">content</span><span class="token punctuation">:</span> String<span class="token operator">!</span> <span class="token directive function">@validate</span><span class="token punctuation">(</span><span class="token attr-name">rules</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"min:12"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">:</span> Post
    <span class="token comment"># Autofill a new post model with the</span>
    <span class="token comment"># arguments from the mutation.</span>
    <span class="token directive function">@create</span><span class="token punctuation">(</span><span class="token attr-name">model</span><span class="token punctuation">:</span> <span class="token string">"Post"</span><span class="token punctuation">)</span>
    <span class="token comment"># Inject the authenticated user's "id"</span>
    <span class="token comment"># into the Post's "user_id" column.</span>
    <span class="token directive function">@inject</span><span class="token punctuation">(</span><span class="token attr-name">context</span><span class="token punctuation">:</span> <span class="token string">"user.id"</span><span class="token punctuation">,</span> <span class="token attr-name">attr</span><span class="token punctuation">:</span> <span class="token string">"user_id"</span><span class="token punctuation">)</span>
    <span class="token comment"># Fire an event w/ the newly created model.</span>
    <span class="token directive function">@event</span><span class="token punctuation">(</span><span class="token attr-name">fire</span><span class="token punctuation">:</span> <span class="token string">"App\\Events\\PostCreated"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre>
</div>
`;
