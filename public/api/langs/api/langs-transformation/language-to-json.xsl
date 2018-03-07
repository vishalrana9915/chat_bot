<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2010 rel. 3 sp1 (x64) (http://www.altova.com) by Shawn S Miller (private) -->
<!-- Description: Used with Grunt XSLTProc Task to transform into individual JSON files-->
<xsl:stylesheet id="xslLangTransformToJson" version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output omit-xml-declaration="no" indent="yes" method="text" encoding="ISO 8859-1"/>

    <xsl:strip-space elements="*"/>

    <xsl:param name="lang">us</xsl:param>

    <xsl:template match="/*">
        <xsl:text>{&#10;</xsl:text>
        <xsl:apply-templates select="key"/>
        <xsl:text>&#10;}</xsl:text>
    </xsl:template>

    <xsl:template match="key">
        <xsl:variable name="vPos" select="position()"/>
        <xsl:if test="$vPos &gt; 1">,&#10;</xsl:if>
        <xsl:text>"</xsl:text>
        <xsl:value-of select="@value"/>
        <xsl:text>" : "</xsl:text>
        <xsl:apply-templates select="language[@value = $lang]"/>
        <xsl:text>"</xsl:text>
    </xsl:template>

    <xsl:template match="language/@value">
        <xsl:value-of select="concat('&quot;', ., '&quot;')"/>
    </xsl:template>

</xsl:stylesheet>
