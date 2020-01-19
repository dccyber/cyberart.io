<html>
<head>
    <title>Docs For Class NeuralNetwork</title>
    <style type='text/css'>
        .php {
            padding: 1em;
        }
        .php-src { font-family: 'Courier New', Courier, monospace; font-weight: normal; }

        body
        {
            color:              #000000;
            background-color:   #ffffff;
            background-repeat:  repeat-y;
            font-family:        tahoma, verdana, arial, sans-serif;
            font-size:          10pt;
        }

        a
        {
            color:              #000099;
            background-color:   transparent;
            text-decoration:    none;
        }

        a:hover
        {
            text-decoration:    underline;
        }

        a.menu
        {
            color:              #ffffff;
            background-color:   transparent;
        }

        td
        {
            font-size:          10pt;
        }

        td.header_top
        {
            color:              #ffffff;
            background-color:   #9999cc;
            font-size:          16pt;
            font-weight:        bold;
            text-align:         right;
            padding:            10px;
        }

        td.header_line
        {
            color:              #ffffff;
            background-color:   #333366;
        }

        td.header_menu
        {
            color:              #ffffff;
            background-color:   #666699;
            font-size:          8pt;
            text-align:         right;
            padding:            2px;
            padding-right:      5px;
        }

        td.menu
        {
            padding:            2px;
            padding-left:       5px;
        }

        td.code_border
        {
            color:              #000000;
            background-color:   #c0c0c0;
        }

        td.code
        {
            color:              #000000;
            background-color:   #f0f0f0;
        }

        td.type
        {
            font-style:         italic;
        }

        div.credit
        {
            font-size:          8pt;
            text-align:         center;
        }

        div.package
        {
            padding-left:       5px;
        }

        div.tags
        {
            padding-left:       15px;
        }

        div.function
        {
            padding-left:       15px;
        }

        div.top
        {
            font-size:          8pt;
        }

        div.warning
        {
            color:              #ff0000;
            background-color:   transparent;
        }

        div.description
        {
            padding-left:       15px;
        }

        hr
        {
            height:             1px;
            border-style:       solid;
            border-color:       #c0c0c0;
            margin-top:         10px;
            margin-bottom:      10px;
        }

        span.smalllinenumber
        {
            font-size:          8pt;
        }

        ul {
            margin-left:    0px;
            padding-left:   8px;
        }
        /* Syntax highlighting */

        .src-code { background-color: #f5f5f5; border: 1px solid #ccc9a4; padding: 0px; margin : 0px;
            font-family: 'Courier New', Courier, monospace; font-weight: normal; }
        .src-line {  font-family: 'Courier New', Courier, monospace; font-weight: normal; }

        .src-comm { color: green; }
        .src-id {  }
        .src-inc { color: #0000FF; }
        .src-key { color: #0000FF; }
        .src-num { color: #CC0000; }
        .src-str { color: #66cccc; }
        .src-sym { font-weight: bold; }
        .src-var { }

        .src-php { font-weight: bold; }

        .src-doc { color: #009999 }
        .src-doc-close-template { color: #0000FF }
        .src-doc-coretag { color: #0099FF; font-weight: bold }
        .src-doc-inlinetag { color: #0099FF }
        .src-doc-internal { color: #6699cc }
        .src-doc-tag { color: #0080CC }
        .src-doc-template { color: #0000FF }
        .src-doc-type { font-style: italic }
        .src-doc-var { font-style: italic }

        .tute-tag { color: #009999 }
        .tute-attribute-name { color: #0000FF }
        .tute-attribute-value { color: #0099FF }
        .tute-entity { font-weight: bold; }
        .tute-comment { font-style: italic }
        .tute-inline-tag { color: #636311; font-weight: bold }

        /* tutorial */

        .authors {  }
        .author { font-style: italic; font-weight: bold }
        .author-blurb { margin: .5em 0em .5em 2em; font-size: 85%; font-weight: normal; font-style: normal }
        .example { border: 1px dashed #999999; background-color: #EEEEEE; padding: .5em; }
        .listing { border: 1px dashed #999999; background-color: #EEEEEE; padding: .5em; white-space: nowrap; }
        .release-info { font-size: 85%; font-style: italic; margin: 1em 0em }
        .ref-title-box {  }
        .ref-title {  }
        .ref-purpose { font-style: italic; color: #666666 }
        .ref-synopsis {  }
        .title { font-weight: bold; margin: 1em 0em 0em 0em; padding: .25em; border: 2px solid #999999; background-color: #9999CC  }
        .cmd-synopsis { margin: 1em 0em }
        .cmd-title { font-weight: bold }
        .toc { margin-left: 2em; padding-left: 0em }
    </style>
</head>
<body>

<h1>Class: NeuralNetwork</h1>


<table width="100%" border="0">
    <tr><td valign="top">

            <h3><a href="#class_details">Class Overview</a></h3>
            <pre></pre><br />
            <div class="description"><strong>Multi-layer Neural Network in PHP</strong></div><br /><br />
            <h4>Author(s):</h4>
            <ul>
                <li>E. Akerboom</li>
                <li><a href="http://www.tremani.nl/">Tremani</a>, <a href="http://maps.google.com/maps?f=q&hl=en&q=delft%2C+the+netherlands&ie=UTF8&t=k&om=1&ll=53.014783%2C4.921875&spn=36.882665%2C110.566406&z=4">Delft</a>, The Netherlands</li>
            </ul>






            <h4>Version:</h4>
            <ul>
                <li>1.0</li>
            </ul>


        </td>



        <td valign="top">
            <h3><a href="#class_methods">Methods</a></h3>
            <ul>
                <li><a href="#methodNeuralNetwork">NeuralNetwork</a></li>
                <li><a href="#methodactivation">activation</a></li>
                <li><a href="#methodaddControlData">addControlData</a></li>
                <li><a href="#methodaddTestData">addTestData</a></li>
                <li><a href="#methodcalculate">calculate</a></li>
                <li><a href="#methodderivative_activation">derivative_activation</a></li>
                <li><a href="#methodgetControlDataIDs">getControlDataIDs</a></li>
                <li><a href="#methodgetLearningRate">getLearningRate</a></li>
                <li><a href="#methodgetMomentum">getMomentum</a></li>
                <li><a href="#methodgetRandomWeight">getRandomWeight</a></li>
                <li><a href="#methodgetTestDataIDs">getTestDataIDs</a></li>
                <li><a href="#methodisVerbose">isVerbose</a></li>
                <li><a href="#methodload">load</a></li>
                <li><a href="#methodsave">save</a></li>
                <li><a href="#methodsetLearningRate">setLearningRate</a></li>
                <li><a href="#methodsetMomentum">setMomentum</a></li>
                <li><a href="#methodsetVerbose">setVerbose</a></li>
                <li><a href="#methodshowWeights">showWeights</a></li>
                <li><a href="#methodtrain">train</a></li>
            </ul>
        </td>

    </tr></table>
<hr />

<table width="100%" border="0"><tr>






    </tr></table>
<hr />

<a name="class_details"></a>
<h3>Class Details</h3>
<div class="tags">
    [line 75]<br />
    <strong>Multi-layer Neural Network in PHP</strong><br /><br /><p>Loosely based on source code by <a href="http://www.philbrierley.com">Phil Brierley</a>,  that was translated into PHP by 'dspink' in sep 2005</p><p>Algorithm was obtained from the excellent introductory book  &quot;<a href="http://www.amazon.com/link/dp/0321204662">Artificial Intelligence - a guide to intelligent systems</a>&quot;  by Michael Negnevitsky (ISBN 0-201-71159-1)</p><p><strong>Example: learning the 'XOR'-function</strong>  <ol><li><div class="src-line">&nbsp;<span class="src-inc">require_once</span><span class="src-sym">(</span><span class="src-str">&quot;class_neuralnetwork.php&quot;</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;Create&nbsp;a&nbsp;new&nbsp;neural&nbsp;network&nbsp;with&nbsp;3&nbsp;input&nbsp;neurons,</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;4&nbsp;hidden&nbsp;neurons,&nbsp;and&nbsp;1&nbsp;output&nbsp;neuron</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$n&nbsp;</span>=&nbsp;<span class="src-key">new&nbsp;</span><a href="#methodNeuralNetwork">NeuralNetwork</a><span class="src-sym">(</span><span class="src-num">3</span><span class="src-sym">,&nbsp;</span><span class="src-num">4</span><span class="src-sym">,&nbsp;</span><span class="src-num">1</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodsetVerbose">setVerbose</a><span class="src-sym">(</span><span class="src-id">false</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;Add&nbsp;test-data&nbsp;to&nbsp;the&nbsp;network.&nbsp;In&nbsp;this&nbsp;case,</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;we&nbsp;want&nbsp;the&nbsp;network&nbsp;to&nbsp;learn&nbsp;the&nbsp;'XOR'-function.</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;The&nbsp;third&nbsp;input-parameter&nbsp;is&nbsp;the&nbsp;'bias'.</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodaddTestData">addTestData</a><span class="src-sym">(&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">,&nbsp;</span>-<span class="src-num">1</span><span class="src-sym">,&nbsp;</span><span class="src-num">1</span><span class="src-sym">)</span><span class="src-sym">,&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">))</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodaddTestData">addTestData</a><span class="src-sym">(&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">,&nbsp;&nbsp;</span><span class="src-num">1</span><span class="src-sym">,&nbsp;</span><span class="src-num">1</span><span class="src-sym">)</span><span class="src-sym">,&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(&nbsp;</span><span class="src-num">1</span><span class="src-sym">))</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodaddTestData">addTestData</a><span class="src-sym">(&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(&nbsp;</span><span class="src-num">1</span><span class="src-sym">,&nbsp;</span>-<span class="src-num">1</span><span class="src-sym">,&nbsp;</span><span class="src-num">1</span><span class="src-sym">)</span><span class="src-sym">,&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(&nbsp;</span><span class="src-num">1</span><span class="src-sym">))</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodaddTestData">addTestData</a><span class="src-sym">(&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(&nbsp;</span><span class="src-num">1</span><span class="src-sym">,&nbsp;&nbsp;</span><span class="src-num">1</span><span class="src-sym">,&nbsp;</span><span class="src-num">1</span><span class="src-sym">)</span><span class="src-sym">,&nbsp;</span><span class="src-key">array&nbsp;</span><span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">))</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;we&nbsp;try&nbsp;training&nbsp;the&nbsp;network&nbsp;for&nbsp;at&nbsp;most&nbsp;$max&nbsp;times</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$max&nbsp;</span>=&nbsp;<span class="src-num">3</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;train&nbsp;the&nbsp;network&nbsp;in&nbsp;max&nbsp;1000&nbsp;epochs,&nbsp;with&nbsp;a&nbsp;max&nbsp;squared&nbsp;error&nbsp;of&nbsp;0.01</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-key">while&nbsp;</span><span class="src-sym">(</span><span class="src-sym">!</span><span class="src-sym">(</span><span class="src-var">$success</span>=<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodtrain">train</a><span class="src-sym">(</span><span class="src-num">1000</span><span class="src-sym">,&nbsp;</span><span class="src-num">0.01</span><span class="src-sym">))&nbsp;</span>&amp;&amp;&nbsp;<span class="src-var">$max</span>--&gt;<span class="src-num">0</span><span class="src-sym">)&nbsp;</span><span class="src-sym">{</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-comm">//&nbsp;training&nbsp;failed:</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-comm">//&nbsp;1.&nbsp;re-initialize&nbsp;the&nbsp;weights&nbsp;in&nbsp;the&nbsp;network</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><span class="src-id">initWeights</span><span class="src-sym">(</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-comm">//&nbsp;2.&nbsp;display&nbsp;message</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo&nbsp;<span class="src-str">&quot;Nothing&nbsp;found...&lt;hr&nbsp;/&gt;&quot;</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-sym">}</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;print&nbsp;a&nbsp;message&nbsp;if&nbsp;the&nbsp;network&nbsp;was&nbsp;succesfully&nbsp;trained</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-key">if&nbsp;</span><span class="src-sym">(</span><span class="src-var">$success</span><span class="src-sym">)&nbsp;</span><span class="src-sym">{</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-var">$epochs&nbsp;</span>=&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><span class="src-id">getEpoch</span><span class="src-sym">(</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;echo&nbsp;<span class="src-str">&quot;</span><span class="src-str"><span class="src-id">Success</span>&nbsp;<span class="src-id">in</span>&nbsp;<span class="src-var">$epochs</span>&nbsp;<span class="src-id">training</span>&nbsp;<span class="src-id">rounds</span>!&lt;<span class="src-id">hr</span>&nbsp;/&gt;</span><span class="src-str">&quot;</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-sym">}</span></div></li>
        <li><div class="src-line">&nbsp;</div></li>
        <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;in&nbsp;any&nbsp;case,&nbsp;we&nbsp;print&nbsp;the&nbsp;output&nbsp;of&nbsp;the&nbsp;neural&nbsp;network</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;<span class="src-key">for&nbsp;</span><span class="src-sym">(</span><span class="src-var">$i&nbsp;</span>=&nbsp;<span class="src-num">0</span><span class="src-sym">;&nbsp;</span><span class="src-var">$i&nbsp;</span>&lt;&nbsp;<a href="http://www.php.net/count">count</a><span class="src-sym">(</span><span class="src-var">$n</span><span class="src-sym">-&gt;</span><span class="src-id">trainInputs</span><span class="src-sym">)</span><span class="src-sym">;&nbsp;</span><span class="src-var">$i&nbsp;</span>++<span class="src-sym">)&nbsp;</span><span class="src-sym">{</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="src-var">$output&nbsp;</span>=&nbsp;<span class="src-var">$n</span><span class="src-sym">-&gt;</span><a href="#methodcalculate">calculate</a><span class="src-sym">(</span><span class="src-var">$n</span><span class="src-sym">-&gt;</span><span class="src-id">trainInputs</span><span class="src-sym">[</span><span class="src-var">$i</span><span class="src-sym">]</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;<span class="src-str">&quot;</span><span class="src-str">&lt;<span class="src-id">br</span>&nbsp;/&gt;<span class="src-id">Testset</span>&nbsp;<span class="src-var">$i</span>;&nbsp;</span><span class="src-str">&quot;</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;<span class="src-str">&quot;expected&nbsp;output&nbsp;=&nbsp;(&quot;</span>.<a href="http://www.php.net/implode">implode</a><span class="src-sym">(</span><span class="src-str">&quot;,&nbsp;&quot;</span><span class="src-sym">,&nbsp;</span><span class="src-var">$n</span><span class="src-sym">-&gt;</span><span class="src-id">trainOutput</span><span class="src-sym">[</span><span class="src-var">$i</span><span class="src-sym">]</span><span class="src-sym">)</span>.<span class="src-str">&quot;)&nbsp;&quot;</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;<span class="src-str">&quot;output&nbsp;from&nbsp;neural&nbsp;network&nbsp;=&nbsp;(&quot;</span>.<a href="http://www.php.net/implode">implode</a><span class="src-sym">(</span><span class="src-str">&quot;,&nbsp;&quot;</span><span class="src-sym">,&nbsp;</span><span class="src-var">$output</span><span class="src-sym">)</span>.<span class="src-str">&quot;)\n&quot;</span><span class="src-sym">;</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-sym">}</span></div></li>
    </ol></p><p>The resulting output could for example be something along the following lines:</p><p><ol><li><div class="src-line">&nbsp;<span class="src-id">Success&nbsp;in&nbsp;</span><span class="src-num">719&nbsp;</span><span class="src-id">training&nbsp;rounds</span><span class="src-sym">!</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-id">Testset&nbsp;</span><span class="src-num">0</span><span class="src-sym">;&nbsp;</span><span class="src-id">expected&nbsp;output&nbsp;</span>=&nbsp;<span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">)&nbsp;</span><span class="src-id">output&nbsp;from&nbsp;neural&nbsp;network&nbsp;</span>=&nbsp;<span class="src-sym">(</span>-<span class="src-num">0.986415991978</span><span class="src-sym">)</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-id">Testset&nbsp;</span><span class="src-num">1</span><span class="src-sym">;&nbsp;</span><span class="src-id">expected&nbsp;output&nbsp;</span>=&nbsp;<span class="src-sym">(</span><span class="src-num">1</span><span class="src-sym">)&nbsp;</span><span class="src-id">output&nbsp;from&nbsp;neural&nbsp;network&nbsp;</span>=&nbsp;<span class="src-sym">(</span><span class="src-num">0.992121412998</span><span class="src-sym">)</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-id">Testset&nbsp;</span><span class="src-num">2</span><span class="src-sym">;&nbsp;</span><span class="src-id">expected&nbsp;output&nbsp;</span>=&nbsp;<span class="src-sym">(</span><span class="src-num">1</span><span class="src-sym">)&nbsp;</span><span class="src-id">output&nbsp;from&nbsp;neural&nbsp;network&nbsp;</span>=&nbsp;<span class="src-sym">(</span><span class="src-num">0.992469534962</span><span class="src-sym">)</span></div></li>
        <li><div class="src-line">&nbsp;<span class="src-id">Testset&nbsp;</span><span class="src-num">3</span><span class="src-sym">;&nbsp;</span><span class="src-id">expected&nbsp;output&nbsp;</span>=&nbsp;<span class="src-sym">(</span>-<span class="src-num">1</span><span class="src-sym">)&nbsp;</span><span class="src-id">output&nbsp;from&nbsp;neural&nbsp;network&nbsp;</span>=&nbsp;<span class="src-sym">(</span>-<span class="src-num">0.990224120384</span><span class="src-sym">)</span></div></li>
    </ol></p><p>...which indicates the network has learned the task.</p><br /><br /><br />
    <h4>Tags:</h4>
    <div class="tags">
        <table border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td><b>version:</b>&nbsp;&nbsp;</td><td>1.0</td>
            </tr>
            <tr>
                <td><b>since:</b>&nbsp;&nbsp;</td><td>feb 2007</td>
            </tr>
            <tr>
                <td><b>author:</b>&nbsp;&nbsp;</td><td>E. Akerboom</td>
            </tr>
            <tr>
                <td><b>author:</b>&nbsp;&nbsp;</td><td><a href="http://www.tremani.nl/">Tremani</a>, <a href="http://maps.google.com/maps?f=q&hl=en&q=delft%2C+the+netherlands&ie=UTF8&t=k&om=1&ll=53.014783%2C4.921875&spn=36.882665%2C110.566406&z=4">Delft</a></td>
            </tr>
            <tr>
                <td><b>license:</b>&nbsp;&nbsp;</td><td><a href="http://opensource.org/licenses/bsd-license.php">BSD License</a></td>
            </tr>
        </table>
    </div>
</div><br /><br />
<div class="top">[ <a href="#top">Top</a> ]</div><br />


<hr />
<a name="class_methods"></a>
<h3>Class Methods</h3>
<div class="tags">

    <hr />
    <a name="methodNeuralNetwork"></a>
    <h3>constructor NeuralNetwork <span class="smalllinenumber">[line 124]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>NeuralNetwork NeuralNetwork(
                                    array
                                    $nodecount)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Creates a neural network.<br /><br /><p>Example:  <ol><li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;create&nbsp;a&nbsp;network&nbsp;with&nbsp;4&nbsp;input&nbsp;nodes,&nbsp;10&nbsp;hidden&nbsp;nodes,&nbsp;and&nbsp;4&nbsp;output&nbsp;nodes</span></div></li>
            <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$n&nbsp;</span>=&nbsp;<span class="src-key">new&nbsp;</span><a href="#methodNeuralNetwork">NeuralNetwork</a><span class="src-sym">(</span><span class="src-num">4</span><span class="src-sym">,&nbsp;</span><span class="src-num">10</span><span class="src-sym">,&nbsp;</span><span class="src-num">4</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
            <li><div class="src-line">&nbsp;</div></li>
            <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;create&nbsp;a&nbsp;network&nbsp;with&nbsp;4&nbsp;input&nbsp;nodes,&nbsp;1&nbsp;hidden&nbsp;layer&nbsp;with&nbsp;10&nbsp;nodes,</span></div></li>
            <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;another&nbsp;hidden&nbsp;layer&nbsp;with&nbsp;10&nbsp;nodes,&nbsp;and&nbsp;4&nbsp;output&nbsp;nodes</span></div></li>
            <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$n&nbsp;</span>=&nbsp;<span class="src-key">new&nbsp;</span><a href="#methodNeuralNetwork">NeuralNetwork</a><span class="src-sym">(</span><span class="src-num">4</span><span class="src-sym">,&nbsp;</span><span class="src-num">10</span><span class="src-sym">,&nbsp;</span><span class="src-num">10</span><span class="src-sym">,&nbsp;</span><span class="src-num">4</span><span class="src-sym">)</span><span class="src-sym">;</span></div></li>
            <li><div class="src-line">&nbsp;</div></li>
            <li><div class="src-line">&nbsp;<span class="src-comm">//&nbsp;alternative&nbsp;syntax</span></div></li>
            <li><div class="src-line">&nbsp;&nbsp;<span class="src-var">$n&nbsp;</span>=&nbsp;<span class="src-key">new&nbsp;</span><a href="#methodNeuralNetwork">NeuralNetwork</a><span class="src-sym">(</span><span class="src-key">array</span><span class="src-sym">(</span><span class="src-num">4</span><span class="src-sym">,&nbsp;</span><span class="src-num">10</span><span class="src-sym">,&nbsp;</span><span class="src-num">10</span><span class="src-sym">,&nbsp;</span><span class="src-num">4</span><span class="src-sym">))</span><span class="src-sym">;</span></div></li>
        </ol></p><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$nodecount</b>&nbsp;&nbsp;</td>
                    <td>The number of nodes in the consecutive layers.</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodactivation"></a>
    <h3>method activation <span class="smalllinenumber">[line 234]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>float activation(
                                    float
                                    $value)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Implements the standard (default) activation function for backpropagation networks,  the 'tanh' activation function.<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>The final output of the node</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">float&nbsp;&nbsp;</td>
                    <td><b>$value</b>&nbsp;&nbsp;</td>
                    <td>The preliminary output to apply this function to</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodaddControlData"></a>
    <h3>method addControlData <span class="smalllinenumber">[line 294]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void addControlData(
                                    array
                                    $input, array
                                    $output, [int
                                    $id = null])</code>
                            </td></tr></table>
                </td></tr></table><br />

        Add a set of control data to the network.<br /><br /><p>This set of data is used to prevent 'overlearning' of the network. The  network will stop training if the results obtained for the control data  are worsening.</p><p>The data added as control data is not used for training.</p><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$input</b>&nbsp;&nbsp;</td>
                    <td>An input vector</td>
                </tr>
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$output</b>&nbsp;&nbsp;</td>
                    <td>The corresponding output</td>
                </tr>
                <tr>
                    <td class="type">int&nbsp;&nbsp;</td>
                    <td><b>$id</b>&nbsp;&nbsp;</td>
                    <td>(optional) An identifier for this piece of data</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodaddTestData"></a>
    <h3>method addTestData <span class="smalllinenumber">[line 259]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void addTestData(
                                    array
                                    $input, array
                                    $output, [int
                                    $id = null])</code>
                            </td></tr></table>
                </td></tr></table><br />

        Add a test vector and its output<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$input</b>&nbsp;&nbsp;</td>
                    <td>An input vector</td>
                </tr>
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$output</b>&nbsp;&nbsp;</td>
                    <td>The corresponding output</td>
                </tr>
                <tr>
                    <td class="type">int&nbsp;&nbsp;</td>
                    <td><b>$id</b>&nbsp;&nbsp;</td>
                    <td>(optional) An identifier for this piece of data</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodcalculate"></a>
    <h3>method calculate <span class="smalllinenumber">[line 187]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>mixed calculate(
                                    array
                                    $input)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Calculate the output of the neural network for a given input vector<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>The output of the network</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$input</b>&nbsp;&nbsp;</td>
                    <td>The vector to calculate</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodderivative_activation"></a>
    <h3>method derivative_activation <span class="smalllinenumber">[line 246]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>$float derivative_activation(
                                    float
                                    $value)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Implements the derivative of the activation function. By default, this is the  inverse of the 'tanh' activation function: 1.0 - tanh($value)*tanh($value);<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">float&nbsp;&nbsp;</td>
                    <td><b>$value</b>&nbsp;&nbsp;</td>
                    <td>'X'</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodgetControlDataIDs"></a>
    <h3>method getControlDataIDs <span class="smalllinenumber">[line 313]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>array getControlDataIDs(
                                    )</code>
                            </td></tr></table>
                </td></tr></table><br />

        Returns the identifiers of the control data used during the training  of the network (if available)<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>An array of identifiers</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodgetLearningRate"></a>
    <h3>method getLearningRate <span class="smalllinenumber">[line 155]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>float getLearningRate(
                                    int
                                    $layer)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Gets the learning rate for a specific layer<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>The learning rate for that layer</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">int&nbsp;&nbsp;</td>
                    <td><b>$layer</b>&nbsp;&nbsp;</td>
                    <td>The layer to obtain the learning rate for</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodgetMomentum"></a>
    <h3>method getMomentum <span class="smalllinenumber">[line 177]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>float getMomentum(
                                    )</code>
                            </td></tr></table>
                </td></tr></table><br />

        Gets the momentum.<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>The momentum</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodgetRandomWeight"></a>
    <h3>method getRandomWeight <span class="smalllinenumber">[line 647]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>float getRandomWeight(

                                    $layer)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Gets a random weight between [-0.25 .. 0.25]. Used to initialize the network.<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>A random weight</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">&nbsp;&nbsp;</td>
                    <td><b>$layer</b>&nbsp;&nbsp;</td>
                    <td></td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodgetTestDataIDs"></a>
    <h3>method getTestDataIDs <span class="smalllinenumber">[line 277]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>array getTestDataIDs(
                                    )</code>
                            </td></tr></table>
                </td></tr></table><br />

        Returns the identifiers of the data used to train the network (if available)<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>An array of identifiers</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodisVerbose"></a>
    <h3>method isVerbose <span class="smalllinenumber">[line 344]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>boolean isVerbose(
                                    )</code>
                            </td></tr></table>
                </td></tr></table><br />

        Returns whether or not the network displays status and error messages.<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>'true' if status and error messages are displayed, 'false' otherwise</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodload"></a>
    <h3>method load <span class="smalllinenumber">[line 355]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>boolean load(
                                    string
                                    $filename)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Loads a neural network from a file saved by the 'save()' function. Clears  the training and control data added so far.<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>'true' on success, 'false' otherwise</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">string&nbsp;&nbsp;</td>
                    <td><b>$filename</b>&nbsp;&nbsp;</td>
                    <td>The filename to load the network from</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodsave"></a>
    <h3>method save <span class="smalllinenumber">[line 399]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>boolean save(
                                    string
                                    $filename)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Saves a neural network to a file<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>'true' on success, 'false' otherwise</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">string&nbsp;&nbsp;</td>
                    <td><b>$filename</b>&nbsp;&nbsp;</td>
                    <td>The filename to save the neural network to</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodsetLearningRate"></a>
    <h3>method setLearningRate <span class="smalllinenumber">[line 141]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void setLearningRate(
                                    array
                                    $learningrate)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Sets the learning rate between the different layers.<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">array&nbsp;&nbsp;</td>
                    <td><b>$learningrate</b>&nbsp;&nbsp;</td>
                    <td>An array containing the learning rates [range 0.0 - 1.0].  The size of this array is 'layercount - 1'. You might also provide a single number. If that is  the case, then this will be the learning rate for the whole network.</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodsetMomentum"></a>
    <h3>method setMomentum <span class="smalllinenumber">[line 168]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void setMomentum(
                                    float
                                    $momentum)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Sets the 'momentum' for the learning algorithm. The momentum should  accelerate the learning process and help avoid local minima.<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">float&nbsp;&nbsp;</td>
                    <td><b>$momentum</b>&nbsp;&nbsp;</td>
                    <td>The momentum. Must be between 0.0 and 1.0; Usually between 0.5 and 0.9</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodsetVerbose"></a>
    <h3>method setVerbose <span class="smalllinenumber">[line 335]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void setVerbose(
                                    boolean
                                    $is_verbose)</code>
                            </td></tr></table>
                </td></tr></table><br />

        Determines if the neural network displays status and error messages. By default, it does.<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">boolean&nbsp;&nbsp;</td>
                    <td><b>$is_verbose</b>&nbsp;&nbsp;</td>
                    <td>'true' if you want to display status and error messages, 'false' if you don't</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodshowWeights"></a>
    <h3>method showWeights <span class="smalllinenumber">[line 322]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>void showWeights(
                                    [boolean
                                    $force = false])</code>
                            </td></tr></table>
                </td></tr></table><br />

        Shows the current weights and thresholds<br /><br /><br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">boolean&nbsp;&nbsp;</td>
                    <td><b>$force</b>&nbsp;&nbsp;</td>
                    <td>Force the output, even if the network is <a href="#methodsetVerbose">not verbose</a>.</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
    <hr />
    <a name="methodtrain"></a>
    <h3>method train <span class="smalllinenumber">[line 424]</span></h3>
    <div class="function">
        <table width="90%" border="0" cellspacing="0" cellpadding="1"><tr><td class="code_border">
                    <table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td class="code">
                                <code>bool train(
                                    [int
                                    $maxEpochs = 500], [float
                                    $maxError = 0.01])</code>
                            </td></tr></table>
                </td></tr></table><br />

        Start the training process<br /><br /><br /><br />
        <h4>Tags:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td><b>return:</b>&nbsp;&nbsp;</td><td>'true' if the training was successful, 'false' otherwise</td>
                </tr>
            </table>
        </div>
        <br /><br />


        <h4>Parameters:</h4>
        <div class="tags">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="type">int&nbsp;&nbsp;</td>
                    <td><b>$maxEpochs</b>&nbsp;&nbsp;</td>
                    <td>The maximum number of epochs</td>
                </tr>
                <tr>
                    <td class="type">float&nbsp;&nbsp;</td>
                    <td><b>$maxError</b>&nbsp;&nbsp;</td>
                    <td>The maximum squared error in the training data</td>
                </tr>
            </table>
        </div><br />
        <div class="top">[ <a href="#top">Top</a> ]</div>
    </div>
</div><br />


<div class="credit">
    <hr />
    Documentation generated by <a href="http://www.phpdoc.org">phpDocumentor 1.3.1</a>
</div>
</td></tr></table>

</body>
</html>